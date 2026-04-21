import Button from '~/components/ui/Button'
import { Chip } from '~/components/ui/Chip'
// import AvatarGroup from '~/components/ui/AvatarGroup'
import images from '~/assets'
import Tooltip from '~/components/ui/Tooltip'
import { capitalizeFirstLetter } from '~/utils/formatters'
// import { fetchBoardDetailsAPI } from '~/apis'

import { FaWindows, FaEarthAsia } from 'react-icons/fa6'
import { MdAddToDrive, MdFilterList } from 'react-icons/md'
import { TbAutomation } from 'react-icons/tb'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import BoardUserGroup from './BoardUserGroup'


function BoardBar({ board }) {
  return (
    <div className="w-full h-(--board-bar-height) flex items-center justify-between bg-[#015FDD] dark:bg-[#34495e]">
      <div className="flex min-w-0 flex-1 items-center overflow-x-auto overflow-y-hidden px-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
      ">
        <div className="gap-4 flex items-center shrink-0">
          <Tooltip content={board?.description}>
            <Chip
              icon=<FaWindows />
              label={board?.title}
              clickable={true}
              className="text-white bg-transparent hover:bg-[#175fbf] dark:hover:bg-[#34495e] rounded-b-sm"
            />
          </Tooltip>
          <Chip
            icon=<FaEarthAsia />
            label={capitalizeFirstLetter(board?.type)}
            clickable={true}
            className="text-white bg-transparent"
          />
          <Chip
            icon=<MdAddToDrive />
            label="Add to google drive"
            clickable={true}
            className="text-white bg-transparent"
          />
          <Chip
            icon=<TbAutomation />
            label="Automation"
            clickable={true}
            className="text-white bg-transparent"
          />
          <Chip
            icon=<MdFilterList />
            label="Filters"
            clickable={true}
            className="text-white bg-transparent"
          />
        </div>
      </div>

      <div className="mx-4 gap-4 flex items-center">
        <Button variant="primary" className="flex items-center gap-1 text-white border-white hover:bg-[#1558BC] dark:hover:bg-[#2C3E50] hover:border-2">
          <MdOutlinePersonAddAlt1 className="text-md "/>
          Invite
        </Button>
        {/* <AvatarGroup max={5}>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="border-2 border-white w-8 h-8 rounded-full object-cover" />
          </Tooltip>
        </AvatarGroup> */}
        <BoardUserGroup />
      </div>
    </div >
  )
}

export default BoardBar