import moment from 'moment'
import Tooltip from '~/components/ui/Tooltip'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function CardActivitySection() {
  const currentUser = useSelector(selectCurrentUser)

  const handleAddCardComment = (event) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      if (!event.target?.value) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      }
      console.log(commentToAdd)
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
      {[...Array(0)].length === 0 &&
        <p className="pl-11.25 text-sm font-medium text-[#b1b1b1]">No activity found!</p>
      }
      {[...Array(6)].map((_, index) =>
        <div className="mb-1.5 flex w-full gap-1" key={index}>
          <Tooltip content="trungquandev">
            <img
              className="h-9 w-9 cursor-pointer rounded-full object-cover"
              alt="trungquandev"
              src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
            />
          </Tooltip>
          <div className="w-full">
            <span className="mr-1 font-bold">
              Quan Do
            </span>

            <span className="text-xs">
              {moment().format('llll')}
            </span>

            <div className="mt-1 block wrap-break-word rounded border border-[rgba(0,0,0,0.2)] bg-white px-3 py-2 shadow-[0_0_1px_rgba(0,0,0,0.2)] dark:bg-[#33485D]">
              This is a comment!
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardActivitySection
