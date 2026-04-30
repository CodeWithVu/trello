import moment from 'moment'
import Tooltip from '~/components/ui/Tooltip'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function CardActivitySection({ cardComments = [], onAddCardComment }) {
  const currentUser = useSelector(selectCurrentUser)

  const handleAddCardComment = (event) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      event.stopPropagation()
      if (!event.target?.value) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      }
      // GỌi lên component cha
      onAddCardComment(commentToAdd).then(() => {
        event.target.value = ''
      })
    }
  }

  return (
    <div className="mt-2">
      {/* Xử lý thêm comment vào Card */}
      <div className="mb-2 flex items-center gap-1">
        <img
          className="h-9 w-9 cursor-pointer rounded-full object-cover"
          alt="trungquandev"
          src={currentUser?.avatar}
        />
        <textarea
          className="max-h-32 min-h-10 w-full resize-y rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 dark:border-slate-600 dark:bg-[#33485D] dark:text-slate-100"
          placeholder="Write a comment..."
          onKeyDown={handleAddCardComment}
        />
      </div>

      {/* Hiển thị danh sách các comments */}
      {(!cardComments || cardComments.length === 0) &&
        <p className="pl-11.25 text-sm font-medium text-[#b1b1b1]">No activity found!</p>
      }
      {cardComments && cardComments.map((comment, index) =>
        <div className="mb-1.5 flex w-full gap-1" key={comment?._id ?? index}>
          <Tooltip content={comment?.userDisplayName || comment?.userEmail || 'User'}>
            <img
              className="h-9 w-9 cursor-pointer rounded-full object-cover"
              alt={comment?.userDisplayName || 'user-avatar'}
              src={comment?.userAvatar}
            />
          </Tooltip>
          <div className="w-full">
            <span className="mr-1 font-bold">
              {comment?.userDisplayName || comment?.userEmail || 'Unknown'}
            </span>

            <span className="text-xs">
              {comment?.commentedAt ? moment(comment.commentedAt).format('llll') : moment().format('llll')}
            </span>

            <div className="mt-1 block wrap-break-word rounded border border-[rgba(0,0,0,0.2)] bg-white px-3 py-2 shadow-[0_0_1px_rgba(0,0,0,0.2)] dark:bg-[#33485D]">
              {comment?.content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardActivitySection
