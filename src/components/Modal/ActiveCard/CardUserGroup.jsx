import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MdAdd, MdCheckCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Tooltip from '~/components/ui/Tooltip'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { CARD_MEMBERS_ACTIONS } from '~/utils/constants'

function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }) {
  // lấy những thông tin users trong board
  const board = useSelector(selectCurrentActiveBoard)

  // Thành viên trong card sẽ phải là tập con của thành viên trong board
  // vì thế dựa vào board.FE_allUsers và card.memberIds rồi chúng ta tạo 1 mảng FE_cardMembers chứa đủ thông tin của user
  // để hiển thị ra ngoài giao diện, bỏi mặc định trong card chỉ lưu đám Id của user
  const FE_cardMembers = board?.FE_allUsers?.filter(user => cardMemberIds.includes(user._id))


  const handleUpdateCardMembers = (user) => {
    // console.log(user)
    // Tạo một biến incomingUserInfo để gửi cho be với 2 thông tin chính là userId và action là thêm vào card hoặc xóa khỏi card
    const incomingUserInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id) ? CARD_MEMBERS_ACTIONS.REMOVE : CARD_MEMBERS_ACTIONS.ADD
    }
    // console.log('incomingMemberInfo', incomingUserInfo)
    onUpdateCardMembers(incomingUserInfo)
  }

  return (
    <div className="flex flex-wrap gap-1">
      {/* Hiển thị các user là thành viên của card */}
      {FE_cardMembers.map((user, index) =>
        <Tooltip content={user.displayName} key={index}>
          <img
            className="h-8.5 w-8.5 cursor-pointer rounded-full object-cover"
            alt="avatar"
            src={user.avatar}
          />
        </Tooltip>
      )}

      {/* Nút này để mở popover thêm member */}
      <Popover className="relative z-30">
        <Tooltip content="Add new member">
          <PopoverButton className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-[#e9f2ff] hover:text-[#0c66e4] focus:outline-none dark:bg-[#2f3542] dark:text-sky-300 dark:hover:bg-[#90caf9] dark:hover:text-[#000000de]">
            <MdAdd className="h-4 w-4" />
          </PopoverButton>
        </Tooltip>

        {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng Click chọn thêm vào card  */}
        <PopoverPanel
          transition
          className="absolute left-0 top-full z-20 mt-2 flex w-65 flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-xl transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 dark:border-slate-700 dark:bg-[#1A2027]"
        >
          {board.FE_allUsers.map((user, index) =>
            <Tooltip content={user.displayName} key={index}>
              <button type="button" className="relative cursor-pointer" onClick={() => handleUpdateCardMembers(user)}>
                <img
                  className="h-8.5 w-8.5 rounded-full object-cover"
                  alt={FE_cardMembers}
                  src={user.avatar}
                />
                {cardMemberIds.includes(user._id) ? <MdCheckCircle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-white text-[#27ae60]" /> : null}
              </button>
            </Tooltip>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default CardUserGroup
