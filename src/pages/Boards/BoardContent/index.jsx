import ListColumn from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  //Có thể dùng PointerSensor vì nó tương thích cả điện thoại và máy tính nhưng nên tách ra thành mouse và touch để tối ưu trải nghiệm người dùng
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu cầu di chuyển chuột 10px thì mới bắt đầu event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // yêu cầu nhấn giữ 250ms và dung sai của cảm ứng (di chuyển chênh lệch 5px)
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const mySensors = useSensors(mouseSensor, touchSensor)

  // Dùng useState để có thể cập nhật sau khi kéo thả
  const [orderedColumns, setOrderedColumns] = useState([])

  // Chỉ khởi tạo khi board thay đổi từ props (data từ API)
  useEffect(() => {
    const columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderedColumns(columns)
  }, [board?.columns, board?.columnOrderIds])

  const handleDragEnd = (event) => {
    const { active, over } = event

    // kéo ra ngoài khỏi vị trí không tồn tại thì return
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // Cập nhật state để UI phản ánh thứ tự mới
      setOrderedColumns(dndOrderedColumns)
    }

  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
        <ListColumn columns={orderedColumns}/>
      </div>
    </DndContext>
  )
}

export default BoardContent