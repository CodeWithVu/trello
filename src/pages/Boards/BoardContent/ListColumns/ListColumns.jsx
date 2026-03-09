import Column from './Column/Column'
import Button from '~/components/ui/Button'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { MdAddBox } from 'react-icons/md'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { AiOutlineClose } from 'react-icons/ai'

function ListColumn({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title!')
      return
    }

    //Gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    await createNewColumn(newColumnData)

    //Đóng trang
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id) || []} strategy={horizontalListSortingStrategy}>
      <div className="bg-inherit flex items-start overflow-x-auto overflow-y-hidden pb-2 w-full h-full
      [&::-webkit-scrollbar]:pt-4
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-black/10
      [&::-webkit-scrollbar-thumb]:bg-white/50
      [&::-webkit-scrollbar-thumb]:rounded-full">
        {columns?.map((column) => {
          return <Column key={column._id} column={column} createNewCard={createNewCard}/>
        })}

        {/* Add new column */}
        { !openNewColumnForm
          ? <div className="border-none min-w-62.5 max-w-62.5 mx-4 h-fit bg-[#ffffff3d]  rounded-lg hover:brightness-90">
            <Button
              className="border-none flex items-center cursor-not-allowed gap-1 text-white leading-6 w-full justify-start pl-2 py-1 "
              onClick={toggleOpenNewColumnForm}
            >
              <MdAddBox className="text-lg"/>
              <span className="text-md ">Add new column</span>
            </Button>
          </div>
          : <div className="max-w-62.5 min-w-62.5 mx-2 p-1 rounded-sm h-fit bg-[#ffffff3d] flex flex-col gap-1">
            <div className="h-10 flex border border-[#A4A1AA] rounded-sm text-[#e2dfe9] hover:border-white group
                            focus-within:border-white focus-within:text-white transition-colors">
              <input
                autoFocus
                placeholder="Enter column title..."
                className="pl-2 border-none outline-none bg-transparent text-amber-50"
                value={newColumnTitle}
                onChange = {(e) => setNewColumnTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center px-2 mt-1">
              <Button className="text-amber-50 bg-[#68B18C] hover:bg-[#0D751B] shadow-lg"
                onClick={addNewColumn}
              >Add column</Button>
              <AiOutlineClose
                className="text-amber-50 cursor-pointer w-7 h-7 p-2 hover:bg-[#9C99A5] rounded-full"
                onClick={toggleOpenNewColumnForm}
              />
            </div>
          </div>
        }
      </div>
    </SortableContext>
  )
}

export default ListColumn