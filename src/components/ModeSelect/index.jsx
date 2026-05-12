import { useDarkMode } from '../../hooks/useDarkMode'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti'
import { IoMoon } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


function ModeSelect() {
  const theme = [
    { value: 'light', name: 'Light', icon: <TiAdjustBrightness /> },
    { value: 'dark', name: 'Dark', icon: <IoMoon /> },
    { value: 'system', name: 'System', icon: <TiAdjustContrast /> }
  ]


  const [, setMode, mode] = useDarkMode()
  const board = useSelector(selectCurrentActiveBoard)

  // Xác định màu sắc dựa trên hình nền
  const textColorClass = board?.backgroundImage ? (board?.backgroundBrightness === 'light' ? 'text-black' : 'text-white') : ''
  const borderColorClass = board?.backgroundImage ? (board?.backgroundBrightness === 'light' ? 'border-black/40' : 'border-white/40') : 'border-[#A4A1AA]'

  // Xử lý cái nền của chữ "Mode" (cái hộp nhỏ đè lên viền)
  const labelBgClass = board?.backgroundImage
    ? (board?.backgroundBrightness === 'light' ? 'bg-white' : 'bg-[#172b4d]') // Màu xanh đậm Trello hoặc Trắng
    : 'bg-white dark:bg-[#2c3e50]'

  const currentTheme = theme.find(t => t.value === mode)
  return (
    <Listbox value={mode} onChange={setMode} >
      <div className="relative ml-4">
        <ListboxButton className={`peer w-24 flex items-center gap-2 px-3 py-2 rounded border outline-none cursor-pointer transition-all ${borderColorClass} ${textColorClass} data-open:border-blue-500`}>
          {currentTheme?.name}
          {currentTheme?.icon}
        </ListboxButton>
        <span className={`absolute -top-2 left-2 px-1 z-10 text-xs font-normal pointer-events-none transition-colors ${labelBgClass} ${textColorClass}`}>
          Mode
        </span>
      </div>

      <ListboxOptions
        modal={false}
        anchor="bottom"
        className=" w-24 rounded focus:outline-none bg-white dark:bg-gray-700 border-black shadow-lg">
        {theme.map((t) => (
          <ListboxOption
            key={t.value}
            value={t.value}
            className=" flex items-center gap-2 px-3 py-2 rounded data-focus:bg-blue-100 dark:text-amber-50 dark:hover:text-gray-800"
          >
            {t.name}
            {t.icon}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default ModeSelect