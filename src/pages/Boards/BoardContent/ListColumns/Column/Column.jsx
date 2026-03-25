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
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {
  createNewCardAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '70px'

function Column({ column }) {
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
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)


  const addNewCard = async () => {
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

    // Gọi API tạo mới card
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = cloneDeep(board)
    newBoard.columns = newBoard.columns.map(column => {
      if (column._id === createdCard.columnId) {
        if ( column.cards.some(card => card.FE_PlaceholderCard)) {
          column.cards = [createdCard]
          column.cardOrderIds = [createdCard._id]
        } else {
          return {
            ...column,
            cards: [...column.cards, createdCard],
            cardOrderIds: [...column.cards.map(c => c._id), createdCard._id]
          }
        }
      }
      return column
    })
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    //Đóng trang
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }


  const handleDeleteColumn = async () => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API
    const res = await deleteColumnDetailsAPI(column._id)
    toast.success(res?.deleteResult || 'Xóa column thành công!')
    setIsOpenDialog(false)
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
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5] hover:text-[#0D751B]"
                    onClick={toggleOpenNewCardForm}
                  >
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
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5] hover:text-red-500"
                    onClick={() => setIsOpenDialog(true)}
                  >
                    <MdDeleteForever />
                  Delete this column
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]"
                  >
                    <MdOutlineArchive/>
                  Archive this column
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Confirm dialog đặt ngoài Menu để tránh lỗi headlessui Fragment */}
            <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)} className="relative z-50 ">
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 rounded-md bg-white p-12 shadow-2xl ">
                  <DialogTitle className="font-bold text-red-500 flex items-center justify-center text-xl">Remove this column</DialogTitle>
                  <Description>This will permanently remove your column and its cards</Description>
                  <p>Are you sure you want to remove this column? All of your data will be permanently removed.</p>
                  <div className="flex gap-4 justify-end">
                    <button onClick={() => setIsOpenDialog(false)} className=" font-bold text-gray-500 hover:opacity-70">Cancel</button>
                    <button onClick={handleDeleteColumn} className="font-bold p-2 rounded-sm text-red-400 cursor-pointer shadow-lg border border-red-300 hover:opacity-70">Remove</button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
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