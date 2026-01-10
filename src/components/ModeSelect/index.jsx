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
    <Listbox value={mode} onChange={setMode}>
      <ListboxButton className="ml-4  w-24 flex items-center gap-2  px-3 py-2 rounded border bg-(--color-primary) text-white border-white dark:border-white dark:bg-(--color-primary) dark:text-white">
        {currentTheme?.name}
        {currentTheme?.icon}
      </ListboxButton>

      <ListboxOptions anchor="bottom" className="rounded border bg-(--color-primary) dark:bg-(--color-primary) border-white dark:border-white shadow-lg">
        {theme.map((t) => (
          <ListboxOption
            key={t.value}
            value={t.value}
            className="w-24 flex items-center gap-2 px-3 py-2 rounded data-focus:bg-blue-100 dark:text-amber-50 dark:hover:text-gray-800"
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