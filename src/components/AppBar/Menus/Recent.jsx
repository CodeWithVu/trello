import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaAngleDown } from 'react-icons/fa'
const links = [
  { href: '/settings', label: 'Settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' }
]

function Recent() {
  return (
    <Menu>
      <MenuButton className="cursor-pointer inline-flex w-full data-active outline-0 items-center gap-2 font-semibold">
        Recent
        <FaAngleDown />
      </MenuButton>
      <MenuItems
        modal={false}
        transition
        anchor="bottom end"
        className="w-42 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-(--color-primary) transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
        {links.map((link) => (
          <MenuItem key={link.href}>
            <a href={link.href} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-blue-100">{link.label}</a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

export default Recent