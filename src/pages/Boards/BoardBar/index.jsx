import { Chip } from '~/components/ui/Chip'
// import AvatarGroup from '~/components/ui/AvatarGroup'
import Tooltip from '~/components/ui/Tooltip'
import { capitalizeFirstLetter } from '~/utils/formatters'
// import { fetchBoardDetailsAPI } from '~/apis'

import { FaWindows, FaEarthAsia } from 'react-icons/fa6'
import { MdAddToDrive, MdFilterList } from 'react-icons/md'
import { TbAutomation } from 'react-icons/tb'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'

function BoardBar({ board }) {
  const isLight = !board?.backgroundImage || board?.backgroundBrightness === 'light'

  return (
    <div className={`w-full h-(--board-bar-height) flex items-center justify-between ${board?.backgroundImage ? `${isLight ? 'bg-white/60' : 'bg-black/20'} ${isLight ? 'text-black' : 'text-white'} backdrop-blur-sm` : 'bg-black/40 text-white'} dark:bg-[#34495e]`} >
      <div className="flex min-w-0 flex-1 text-white items-center overflow-x-auto overflow-y-hidden px-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="gap-4 flex items-center shrink-0 ">
          <Tooltip content={board?.description}>
            <Chip
              icon=<FaWindows />
              label={board?.title}
              clickable={true}
              className={`bg-transparent rounded-b-sm ${isLight ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
            />
          </Tooltip>
          <Chip
            icon=<FaEarthAsia />
            label={capitalizeFirstLetter(board?.type)}
            clickable={true}
            className={`bg-transparent ${isLight ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
          />
          <Chip
            icon=<MdAddToDrive />
            label="Add to google drive"
            clickable={true}
            className={`bg-transparent ${isLight ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
          />
          <Chip
            icon=<TbAutomation />
            label="Automation"
            clickable={true}
            className={`bg-transparent ${isLight ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
          />
          <Chip
            icon=<MdFilterList />
            label="Filters"
            clickable={true}
            className={`bg-transparent ${isLight ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
          />
        </div>
      </div>

      <div className="mx-4 gap-4 flex items-center">
        {/* Xử lý mời user vào làm thành viên của board */}
        <InviteBoardUser boardId={board._id} />
        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </div>
    </div >
  )
}

export default BoardBar