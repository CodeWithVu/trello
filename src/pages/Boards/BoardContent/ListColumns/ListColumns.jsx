import Column from './Column/Column'
import Button from '~/components/ui/Button'

import { MdAddBox } from 'react-icons/md'

function ListColumn({ columns }) {
  return (
    <div className="bg-inherit flex items-start overflow-x-auto overflow-y-hidden pb-2 w-full h-full
      [&::-webkit-scrollbar]:pt-4
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-black/10
      [&::-webkit-scrollbar-thumb]:bg-white/50
      [&::-webkit-scrollbar-thumb]:rounded-full">

      {columns?.map((column) => {
        return <Column key={column._id} column={column}/>
      })}

      {/* Add new column */}
      <div className="border-none min-w-50 max-w-50 mx-4 h-fit bg-[#ffffff3d]  rounded-lg hover:brightness-90">
        <Button className="border-none flex items-center cursor-not-allowed gap-1 text-white leading-6 w-full justify-start pl-2 py-1 ">
          <MdAddBox className="text-lg"/>
          <span className="text-md ">Add new column</span>
        </Button>
      </div>
    </div>
  )
}

export default ListColumn