import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MdAdd, MdCheckCircle } from 'react-icons/md'
import Tooltip from '~/components/ui/Tooltip'

function CardUserGroup({ cardMemberIds = [] }) {
  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <div className="flex flex-wrap gap-1">
      {/* Hiển thị các user là thành viên của card */}
      {[...Array(8)].map((_, index) =>
        <Tooltip content="trungquandev" key={index}>
          <img
            className="h-8.5 w-8.5 cursor-pointer rounded-full object-cover"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
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
          {[...Array(16)].map((_, index) =>
            <Tooltip content="trungquandev" key={index}>
              <button type="button" className="relative cursor-pointer">
                <img
                  className="h-8.5 w-8.5 rounded-full object-cover"
                  alt="trungquandev"
                  src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
                />
                <MdCheckCircle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-white text-[#27ae60]" />
              </button>
            </Tooltip>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default CardUserGroup
