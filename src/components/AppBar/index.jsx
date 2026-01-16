import ModeSelect from '../ModeSelect'
import TrelloLogo from '~/assets/trello.svg?react'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Template from './Menus/Template'
import Profile from './Menus/Profile'
import Tooltip from '~/components/Tooltip'
import { Button } from '~/components/Button/Button.jsx'
import { Input } from '@headlessui/react'
import { Fragment } from 'react'
import { FaRegBell } from 'react-icons/fa6'
import { IoMdHelpCircleOutline } from 'react-icons/io'

function AppBar() {
  return (
    <div className="w-full gap-8 h-(--header) flex items-center justify-between border-b
       overflow-x-auto overflow-y-hidden
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:rounded-md
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <div className="mx-4 gap-4 flex items-center text-blue-500 ">
        <div className="gap-1 flex items-center">
          <TrelloLogo className="w-6 h-6" />
          <span className="text-base font-bold">Trello</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <Workspace />
          <Recent />
          <Starred />
          <Template />
          <Button variant = "primary" className="">Create</Button>
        </div>
      </div>
      <div className="mx-4 gap-4 flex items-center">
        <Input type="text" name="full_name" as={Fragment}>
          {<input className="min-w-30 border p-2 rounded-sm focus:outline-1 focus:outline-(--color-primary) focus:text-(--color-primary) h-10 text-[#A4A1AA]" placeholder="Search..." />}
        </Input>
        <ModeSelect />
        <Tooltip content="Notification">
          <FaRegBell className="text-xl dark:text-amber-50 text-[#505258]"/>
        </Tooltip>

        <Tooltip content="Need help?">
          <IoMdHelpCircleOutline className="text-xl dark:text-amber-50 text-[#505258]"/>
        </Tooltip>
        <Profile />
      </div>
    </div>
  )
}

export default AppBar