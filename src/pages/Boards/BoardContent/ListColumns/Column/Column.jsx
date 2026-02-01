import Tooltip from '~/components/ui/Tooltip'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'


import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { AiOutlineDown } from 'react-icons/ai'
import { MdAddCard,
  MdOutlineContentCut, MdOutlineContentCopy,
  MdContentPaste, MdDeleteForever,
  MdOutlineArchive, MdDragHandle } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '70px'

function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyle = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <div
      className="shrink-0 min-w-67.5 max-w-67.5 max-h-[calc(var(--board-content-height)-30px)] bg-[#ebecf0] dark:bg-[#333643] ml-4 first:ml-2.5 last:mr-2.5 rounded-md flex flex-col"
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
      {...listeners}
    >
      {/* Header */}
      <div
        className="shrink-0 px-4 py-3 flex items-center justify-between"
        style={{ height: COLUMN_HEADER_HEIGHT }}
      >
        <span className="font-semibold text-lg">{column?.title}</span>
        <div>
          <Menu >
            <MenuButton className="inline-flex items-center pr-0 py-1.5 text-sm/6  cursor-pointer focus:not-data-focus:outline-none">
              <Tooltip content="More actions"> <AiOutlineDown /></Tooltip>
            </MenuButton>
            <MenuItems
              modal={false}
              transition
              anchor="bottom start"
              className="w-48 origin-top-right rounded-xl border border-white/5 bg-white  p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdAddCard />
                  Create new card
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdOutlineContentCut />
                  Cut
                </button>
              </MenuItem>
              <div className="my-1 h-px bg-white/5" />
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdOutlineContentCopy />
                Copy
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdContentPaste />
                Paste
                </button>
              </MenuItem>
              <MenuSeparator className="my-2 h-px bg-gray-300" />
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdDeleteForever />
                Remove this column
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                  <MdOutlineArchive />
                Archive this column
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* List cards */}
      <ListCards cards={orderedCards}/>

      {/* Footer */}
      <div
        className="px-4 flex items-center justify-between shrink-0"
        style={{ height: COLUMN_FOOTER_HEIGHT }}>
        <button className="flex items-center gap-2 text-(--color-primary) select-none">
          <MdAddCard />
        Add new card
        </button>
        <Tooltip content="Drag to move"><MdDragHandle /></Tooltip>
      </div>
    </div>
  )
}

export default Column