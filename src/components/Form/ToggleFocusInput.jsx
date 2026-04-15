// TrungQuanDev: https://youtube.com/@trungquandev
import { useState } from 'react'

// Một Trick xử lý css khá hay trong việc làm UI UX khi cần ẩn hiện một cái input: Hiểu đơn giản là thay vì phải tạo biến State để chuyển đổi qua lại giữa thẻ Input và Text thông thường thì chúng ta sẽ CSS lại cho cái thẻ Input trông như text bình thường, chỉ khi click và focus vào nó thì style lại trở về như cái input ban đầu.
// Controlled Input trong React
function ToggleFocusInput({ value, onChangedValue, inputFontSize = '16px', ...props }) {
  const [inputValue, setInputValue] = useState(value)

  // Blur là khi chúng ta không còn Focus vào phần tử nữa thì sẽ trigger hành động ở đây.
  const triggerBlur = () => {
    // Support Trim cái dữ liệu State inputValue cho đẹp luôn sau khi blur ra ngoài
    setInputValue(inputValue.trim())

    // Nếu giá trị không có gì thay đổi hoặc Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu theo value từ props và return luôn không làm gì thêm
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    // console.log('value: ', value)
    // console.log('inputValue: ', inputValue)
    // Khi giá trị có thay đổi ok thì gọi lên func ở Props cha để xử lý
    onChangedValue(inputValue)
  }

  return (
    <input
      id="toggle-focus-input-controlled"
      type="text"
      className="w-full truncate rounded border border-transparent bg-transparent px-1.5 py-1.5 font-bold text-slate-800 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none dark:text-slate-100 dark:focus:bg-[#33485D]"
      style={{ fontSize: inputFontSize }}
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value) }}
      onBlur={triggerBlur}
      {...props}
    />
  )
}

export default ToggleFocusInput
