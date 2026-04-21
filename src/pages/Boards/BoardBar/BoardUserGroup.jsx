import Tooltip from '~/components/ui/Tooltip'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

function BoardUserGroup({ boardUsers = [], limit = 8 }) {
  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng div và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <div className="flex gap-1">
      {/* Hiển thị giới hạn số lượng user theo số limit */}
      {[...Array(16)].map((_, index) => {
        if (index < limit) {
          return (
            <Tooltip content="trungquandev" key={index}>
              <img
                className="h-8.5 w-8.5 cursor-pointer rounded-full object-cover"
                alt="trungquandev"
                src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
              />
            </Tooltip>
          )
        }
      })}

      {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
      {[...Array(16)].length > limit &&
        <Popover className="relative z-50">
          <Tooltip content="Show more">
            <PopoverButton className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#a4b0be] text-[14px] font-medium text-white transition-colors hover:bg-[#8e98a3] focus:outline-none">
              +{[...Array(16)].length - limit}
            </PopoverButton>
          </Tooltip>

          {/* Khi Click vào +number ở trên thì sẽ mở popover hiện toàn bộ users, sẽ không limit nữa */}
          <PopoverPanel
            transition
            className="absolute right-0 top-full z-20 mt-2 flex w-52.5 flex-wrap gap-2.5 rounded-lg border border-slate-200 bg-white p-4 shadow-xl transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 dark:border-slate-700 dark:bg-[#1A2027]"
          >
            {[...Array(16)].map((_, index) =>
              <Tooltip content="trungquandev" key={index}>
                <img
                  className="h-8.5 w-8.5 cursor-pointer rounded-full object-cover hover:opacity-80"
                  alt="trungquandev"
                  src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
                />
              </Tooltip>
            )}
          </PopoverPanel>
        </Popover>
      }
    </div>
  )
}

export default BoardUserGroup
