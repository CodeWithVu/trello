import { Menu, MenuButton, MenuItem, MenuItems, MenuSection, MenuSeparator } from '@headlessui/react'
import images from '~/assets'

function Profile() {
  return (
    <Menu as="div" className="relative shrink-0">
      <MenuButton className="focus:outline-none  cursor-pointer">
        <img src={images.avatarCherry} className="w-8 h-8 rounded-full object-cover hover:brightness-90"/>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        modal={false}
        className="absolute -right-2 top-full mt-1  w-32 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-(--color-primary) transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
        <MenuSection>
          <MenuItem className="py-1">
            <a className="block data-focus:bg-blue-100" href="/profile">
              My profile
            </a>
          </MenuItem>
          <MenuItem className="py-1">
            <a className="block data-focus:bg-blue-100" href="/notifications">
              Notifications
            </a>
          </MenuItem>
          <MenuItem className="py-1">
            <a className="block data-focus:bg-blue-100" href="/support">
              Documentation
            </a>
          </MenuItem>
        </MenuSection>
        <MenuSeparator className="my-2 h-px bg-gray-300" />
        <MenuSection>
          <MenuItem className="py-1">
            <a className="block data-focus:bg-blue-100" href="/license">
              Log out
            </a>
          </MenuItem>
        </MenuSection>
      </MenuItems>
    </Menu>
  )
}

export default Profile