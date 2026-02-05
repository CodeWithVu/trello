import ListColumn from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  // Cùng một thời điểm thì chỉ có 1 phần tử được kéo là column hay card
  // eslint-disable-next-line no-unused-vars
  const [activeDragItemID, setactiveDragItemID] = useState(null)

  const [activeDragItemType, setactiveDragItemType] = useState(null)

  const [activeDragItemData, setactiveDragItemData] = useState(null)

  // Chỉ khởi tạo khi board thay đổi từ props (data từ API)
  useEffect(() => {
    const columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderedColumns(columns)
  }, [board?.columns, board?.columnOrderIds])

  // Tìm column theo cardId
  const findColumnByCardId = (cardId) => {
    // tìm cards thay vì cardOrderIds vì ở bước này sẽ xử lý dữ liệu cho card hoàn chỉnh trước
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }


  const handleDragStart = (event) => {
    setactiveDragItemID(event?.active.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    if (!over || !active) return

    // Card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // Card đang tương tác (đổi chỗ cho card đang được kéo)
    const { id: overCardId } = over

    // Tìm 2 column theo cardID
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Không tồn tại 1 trong 2 column thì ko làm gì
    if (!activeColumn || !overColumn) return

    // Xử lý kéo card giữa 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // tìm vị trí index của cái overCard trong column đích
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Logic tính toán cho cardIndex mới
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated
        && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // Clone lại mảng orderedColumn cũ ra một cái mới để xử lý data rồi return - cập nhật lại orderedColumnState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //Column cũ
        if (nextActiveColumn) {
          // Xóa card ở column đã bị kéo
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // cập nhật lại mảng card
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // Kiểm tra xem card đang kéo có đang ở column over hay chưa, nếu có thì xóa đi
        // Column mới
        if (nextOverColumn) {

          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Thêm card đang kéo vào overColumn nhưng xét lại vị trí
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

        }

        return nextColumns
      })
    }

  }

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // kéo ra ngoài khỏi vị trí không tồn tại thì return
    if (!over) return

    // Xử lý kéo thả Column
    if (active.data.current?.type === 'COLUMN') {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newIndex = orderedColumns.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        // Cập nhật state để UI phản ánh thứ tự mới
        setOrderedColumns(dndOrderedColumns)
      }
    }
    setactiveDragItemID(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={mySensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
        <ListColumn columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

export default BoardContent