import { useDarkMode } from '../../hooks/useDarkMode'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti'
import { IoMoon } from 'react-icons/io5'


function ModeSelect() {
  const theme = [
    { value: 'light', name: 'Light', icon: <TiAdjustBrightness /> },
    { value: 'dark', name: 'Dark', icon: <IoMoon /> },
    { value: 'system', name: 'System', icon: <TiAdjustContrast /> }
  ]


  const [, setMode, mode] = useDarkMode()

  const currentTheme = theme.find(t => t.value === mode)
  return (
    <Listbox value={mode} onChange={setMode} >
      <div className="relative ml-4">
        <ListboxButton className="peer w-24 flex items-center gap-2 px-3 py-2 rounded border border-[#A4A1AA] data-open:text-white outline-none data-open:border-white text-white button:focus:text-(--color-primary) cursor-pointer dark:text-white">
          {currentTheme?.name}
          {currentTheme?.icon}
        </ListboxButton>
        <span className="absolute -top-2 left-2 px-1 z-10 bg-[#024DC5]  dark:bg-[#2c3e50]  text-xs font-normal text-white peer-data-open:text-white dark:text-white pointer-events-none transition-colors">
          Mode
        </span>
      </div>

      <ListboxOptions
        modal={false}
        anchor="bottom"
        className=" w-24 rounded focus:outline-none bg-white dark:bg-gray-700 border-white shadow-lg">
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