
import moment from 'moment'
import { MdOutlineNotificationsNone, MdGroupAdd, MdDone, MdBlock } from 'react-icons/md'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvitationsAPI, selectCurrentNotifications, updateBoardInvitationAPI, addNotification } from '~/redux/notifications/notificationsSlice'
import { useEffect, useState } from 'react'
import { socketIoInstance } from '~/socketClient'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {

  // Láy dữ liệu notification từ trong redux
  const notifications = useSelector(selectCurrentNotifications)
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()


  const [newNotification, setNewNotification] = useState(false)

  const handleClickNotificationIcon = () => {

    // khi click vào icon thông báo  thì xet lại trạng thái biến newNotification về false
    setNewNotification(false)
  }

  // fetch danh sách các lời mời
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvitationsAPI())

    // Tạo 1 func để xử lý sự kiện realtime
    const onReceiveNewInvitation = (invitation) => {
      // Nếu th user đang đăng nhập hiện tại mà lưu trong redux chính là th invitee trong bản ghi invitation
      if (invitation.inviteeId === currentUser._id) {
        //B1: thêm bản ghi invitation mới vào trong redux
        dispatch(addNotification(invitation))
        //B2: Cập nhật trạng thái đang có thông báo đến
        setNewNotification(true)
      }
    }

    // Lắng nghe 1 sự kiện real-time có tên là BE_USER_INVITED_TO_BOARD từ phía server gửi về
    socketIoInstance.on('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)

    // clean up sự kiện để ko bị lặp lại
    return () => {
      socketIoInstance.off('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
    }

  }, [dispatch, currentUser._id])


  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId }))
      .then(res => {
        if (res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
          navigate(`boards/${res.payload.boardInvitation.boardId}`)
        }
      })
  }

  return (
    <Popover className="relative">
      <PopoverButton
        className="relative cursor-pointer flex items-center justify-center p-1.5 hover:bg-white/20 dark:hover:bg-gray-800 rounded-full transition-colors outline-none"
        title="Notifications"
        onClick={handleClickNotificationIcon}
      >
        <MdOutlineNotificationsNone size={24} />
        {newNotification ? <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#024DC5] dark:border-[#2c3e50]"></span>:<span></span>}
      </PopoverButton>

      <PopoverPanel
        modal={false}
        anchor="bottom end"
        className="z-50 w-80 max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none origin-top-right transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="py-2 max-h-[80vh] overflow-y-auto">
          {(!notifications || notifications.length === 0) && (
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 min-w-50">
              You do not have any new notifications.
            </div>
          )}
          {notifications?.map((notification, index) => (
            <div key={index}>
              <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <div className="flex flex-col gap-2 wrap-break-word whitespace-pre-wrap">
                  {/* Nội dung của thông báo */}
                  <div className="flex items-start gap-1">
                    <div className="mt-0.5 text-gray-500 dark:text-gray-400">
                      <MdGroupAdd size={20} />
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>{notification.inviter?.displayName}</strong> had invited you to join the board <strong> {notification.board?.title}</strong>
                    </div>
                  </div>

                  {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                  {notification.boardInvitation.status === BOARD_INVITATION_STATUS.PENDING &&
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md transition disabled:opacity-50"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition disabled:opacity-50"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification._id)}
                    >
                      Reject
                    </button>
                  </div>
                  }
                  {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}
                  <div className="flex items-center gap-2 justify-end">
                    {notification.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED &&
                    <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      <MdDone size={16} /> Accepted
                    </div>
                    }
                    { notification.boardInvitation.status === BOARD_INVITATION_STATUS.REJECTED &&
                    <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700/50 dark:text-gray-300">
                      <MdBlock size={16} /> Rejected
                    </div>
                    }
                  </div>

                  {/* Thời gian của thông báo */}
                  <div className="text-right">
                    <span className="text-[13px] text-gray-500 dark:text-gray-400">
                      {moment(notification.createdAt).format('llll')}
                    </span>
                  </div>
                </div>
              </div>
              {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
              {index !== (notifications?.length - 1) && (
                <hr className="border-gray-200 dark:border-gray-800" />
              )}
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default Notifications
