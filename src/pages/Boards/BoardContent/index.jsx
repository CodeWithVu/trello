import ListColumn from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderdColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
      <ListColumn columns={orderdColumns}/>
    </div>
  )
}

export default BoardContent