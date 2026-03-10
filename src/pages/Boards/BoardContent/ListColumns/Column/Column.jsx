import Tooltip from '~/components/ui/Tooltip'
import ListCards from './ListCards/ListCards'
import Button from '~/components/ui/Button'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { AiOutlineDown, AiOutlineClose } from 'react-icons/ai'
import { MdAddCard,
  MdOutlineContentCut, MdOutlineContentCopy,
  MdContentPaste, MdDeleteForever,
  MdOutlineArchive, MdDragHandle } from 'react-icons/md'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '70px'

function Column({ column, createNewCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column, type: 'COLUMN' }
  })

  const dndKitColumnStyle = {
    touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  //Card đã dc sắp xếp ở component cha cao nhất board/_id.jsx
  const orderedCards = column.cards
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter card title!', {
        position: 'bottom-right'
      })
      return
    }

    //Gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    //GỌi lên props function createNewCard ở component cha cao nhất là (board/_id.jsx)
    createNewCard(newCardData)

    //Đóng trang
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
    >
      <div
        className="shrink-0 min-w-67.5 max-w-67.5 max-h-[calc(var(--board-content-height)-30px)] bg-[#ebecf0] dark:bg-[#333643] ml-4 first:ml-2.5 last:mr-2.5 rounded-md flex flex-col"
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
          className="p-4"
          style={{ height: openNewCardForm ? 'auto' : COLUMN_FOOTER_HEIGHT }}>
          {!openNewCardForm
            ? <div className="flex items-center justify-between w-full">
              <button className="flex items-center gap-2 text-(--color-primary) select-none"
                onClick={toggleOpenNewCardForm}>
                <MdAddCard />
              Add new card
              </button>
              <Tooltip content="Drag to move"><MdDragHandle /></Tooltip>
            </div>
            : <div className="w-full flex items-center gap-1">
              <div className=" border border-[#A4A1AA] rounded-sm text-[#e2dfe9] hover:border-white group
                              focus-within:border-white focus-within:text-white transition-colors">
                <input
                  autoFocus
                  placeholder="Enter card title..."
                  className="pl-2 w-full h-10 border border-(--color-primary) rounded-sm bg-white outline-none  text-black"
                  data-no-dnd="true"
                  value={newCardTitle}
                  onChange = {(e) => setNewCardTitle(e.target.value)}
                />
              </div>
              <Button className="text-amber-50 bg-[#68B18C] hover:bg-[#0D751B] shadow-lg shrink-0"
                onClick={addNewCard}
              >Add</Button>
              <AiOutlineClose
                className="text-(--color-primary) cursor-pointer w-7 h-7 p-1 hover:bg-[#9C99A5] rounded-full shrink-0"
                onClick={toggleOpenNewCardForm}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Column