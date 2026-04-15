import { Menu, MenuButton, MenuItem, MenuItems, MenuSection, MenuSeparator } from '@headlessui/react'
import { MdOutlineSettings, MdLogout } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { useState } from 'react'
import { Description, Dialog, DialogPanel } from '@headlessui/react'
import { Link } from 'react-router-dom'


function Profile() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }
  return (
    <>
      <Menu as="div" className="relative shrink-0">
        <MenuButton className="focus:outline-none  cursor-pointer">
          <img src={currentUser?.avatar} className="w-8 h-8 rounded-full object-cover hover:brightness-90"/>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          modal={false}
          className="absolute -right-2 top-full mt-1  w-32 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          <MenuSection>
            <MenuItem className="m-0 w-full flex p-0 items-center justify-center ">
              <Link className="flex w-full items-center justify-center gap-2 rounded-md p-2 data-focus:bg-blue-100" to="/settings/account">
                <img src={currentUser?.avatar} className="h-5 w-5 rounded-full object-cover"/>
                Profile
              </Link>
            </MenuItem>
            <MenuItem className="m-0 w-full flex p-0 items-center justify-center">
              <Link className="flex w-full items-center gap-2 rounded-md p-2 data-focus:bg-blue-100" to="/notifications">
                <MdOutlineSettings />
                Setting
              </Link>
            </MenuItem>
          </MenuSection>
          <MenuSeparator className="my-2 h-px bg-gray-300" />
          <MenuSection>
            <MenuItem className="py-1">
              <button onClick={() => setIsOpenDialog(true)} className="flex data-focus:bg-blue-100 data-focus:text-red-500 p-2 gap-2 items-center justify-center rounded-md w-full">
                <MdLogout />
                Log out
              </button>
            </MenuItem>
          </MenuSection>
        </MenuItems>
      </Menu>

      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)} className="relative z-50 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-md bg-white p-12 shadow-2xl ">
            <Description className="font-normal">Are you sure log out ?</Description>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setIsOpenDialog(false)} className=" font-bold text-gray-500 hover:opacity-70">Cancel</button>
              <button onClick={handleLogout} className="font-bold p-2 rounded-sm text-blue-400 cursor-pointer shadow-lg border border-blue-300 hover:opacity-70">Confirm</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Profile