import { Chip } from '~/components/Chip'
import { FaWindows, FaEarthAsia } from 'react-icons/fa6'
import { MdAddToDrive, MdFilterList } from 'react-icons/md'
import { TbAutomation } from 'react-icons/tb'
import AvatarGroup from '~/components/AvatarGroup'
import images from '~/assets'
import Tooltip from '~/components/Tooltip'

function BoardBar() {
  return (
    <div className="w-full h-(--bar) dark:bg-(--color-primary) flex items-center border-t border-(--color-primary) justify-between">
      <div className="px-4 gap-4 flex items-center">
        <Chip
          icon=<FaWindows />
          label="Vũ Nguyễn Mernstack Board"
          clickable={true}
        />
        <Chip
          icon=<FaEarthAsia />
          label="Public/Private Workspace"
          clickable={true}
        />
        <Chip
          icon=<MdAddToDrive />
          label="Add to google drive"
          clickable={true}
        />
        <Chip
          icon=<TbAutomation />
          label="Automation"
          clickable={true}
        />
        <Chip
          icon=<MdFilterList />
          label="Filters"
          clickable={true}
        />
      </div>

      <div className="mx-4 gap-4 flex items-center">
        <AvatarGroup max={5}>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
          <Tooltip content="Avatar">
            <img src={images.avatarCherry} alt="ảnh avatar" className="w-8 h-8 rounded-full rounded-full" />
          </Tooltip>
        </AvatarGroup>
      </div>
    </div >
  )
}

export default BoardBar