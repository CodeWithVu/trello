import ModeSelect from '../ModeSelect'
import TrelloLogo from '~/assets/trello.svg?react'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Template from './Menus/Template'
import Profile from './Menus/Profile'
import Tooltip from '~/components/ui/Tooltip'
import Button from '~/components/ui/Button'

import { useState } from 'react'
import { BiSolidAddToQueue } from 'react-icons/bi'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { PiDotsNineBold } from 'react-icons/pi'
import Notification from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="w-full gap-8 h-(--header-height) flex items-center justify-between bg-[#024DC5] dark:bg-[#2c3e50]
       overflow-x-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:rounded-md
    dark:[&::-webkit-scrollbar-track]:bg-neutral-300
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
      <div className="px-4 gap-4 flex items-center text-white ">
        <Link to="/boards"><PiDotsNineBold className="text-xl font-bold"/></Link>
        <Link to="/">
          <div className="gap-1 flex items-center">
            <TrelloLogo className="w-6 h-6" />
            <span className="text-base font-bold">Trello</span>
          </div>
        </Link>
        <div className="hidden sm:flex gap-4 ">
          <Workspace />
          <Recent />
          <Starred />
          <Template />
          <Button variant="primary" className="flex items-center gap-1 text-white border-none hover:border-none hover:bg-transparent transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ">
            <BiSolidAddToQueue className="text-md"/>
            Create
          </Button>
        </div>
      </div>
      <div className="px-4 gap-4 flex items-center ">
        {/* <div className="h-10 flex border border-[#A4A1AA] rounded-sm text-[#A4A1AA] hover:border-white group
                focus-within:border-white focus-within:text-white transition-colors">
          <input
            placeholder="Search..."
            className="pl-2 border-none outline-none bg-transparent text-inherit"
            value={searchValue}
            onChange = {(e) => setSearchValue(e.target.value)}
          />
          <button className={`mx-1 cursor-pointer ${searchValue ? '' : 'hidden'}`} onClick={() => setSearchValue('')}>
            <AiOutlineClose />
          </button>
          <button className="relative group-hover:text-white cursor-pointer after:content-[''] after:absolute after:left-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-400 hover:-translate-y-1">
            <IoSearchSharp className="w-8 mx-1"/>
          </button>
        </div> */}
        <AutoCompleteSearchBoard />
        <ModeSelect />
        {/* Xử lý hiển thị thông báo notification */}
        <Notification />

        <Tooltip content="Need help?" contentClassName="w-20">
          <IoMdHelpCircleOutline className="text-xl dark:text-amber-50 text-white" />
        </Tooltip>
        <Profile />
      </div>
    </div>
  )
}

export default AppBar