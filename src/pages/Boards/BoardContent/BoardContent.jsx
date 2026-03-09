import ListColumn from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '~/utils/formatters'

import { useState, useEffect, useCallback, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, rectIntersection, getFirstCollision, closestCenter } from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLib/dndKitSensor'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard, moveColumns }) {
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
  const [activeDragItemID, setactiveDragItemID] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // Điểm va chạm cuối cùng xử lý thuật toán phát hiện va chạm
  const lastOverId = useRef(null)

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

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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

        // Thêm placeholder card nếu card cuối cùng bị kéo làm rỗng column
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // xóa placehoder card đi nếu đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // cập nhật lại mảng card
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }


      // Kiểm tra xem card đang kéo có đang ở column over hay chưa, nếu có thì xóa đi
      // Column mới
      if (nextOverColumn) {

        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // khi kéo 1 card qua một column thì phải cập nhật lại id của column cho card được kéo
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // Thêm card đang kéo vào overColumn nhưng xét lại vị trí
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      }

      return nextColumns
    })
  }


  const handleDragStart = (event) => {
    setactiveDragItemID(event?.active.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!active || !over) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

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
      moveCardBetweenDifferentColumns( overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }

  }

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // kéo ra ngoài khỏi vị trí không tồn tại thì return
    if (!over || !active) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      // Card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // Card đang tương tác (đổi chỗ cho card đang được kéo)
      const { id: overCardId } = over

      // Tìm 2 column theo cardID
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Không tồn tại 1 trong 2 column thì ko làm gì
      if (!activeColumn || !overColumn) return

      // xử lý kéo card trong 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns( overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)
      } else {
        // Láy vị trí cũ của oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemID)
        // Láy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
        // Clone lại mảng orderedColumn cũ ra một cái mới để xử lý data rồi return - cập nhật lại orderedColumnState mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column mà sẽ thả
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          // Cập nhật 2 giá trị mới là card và cardOrderIds trong cái Column
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    // Xử lý kéo thả column trong 1 board content
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id)
    {
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

      // Gọi lê props function moveColumns ở component cha cao nhất(board/_id.jsx)
      moveColumns(dndOrderedColumns)

      // Cập nhật state để UI phản ánh thứ tự mới tránh delay hoặc flickering giao diện lúc kéo thả cần phải chờ gọi API
      setOrderedColumns(dndOrderedColumns)
    }

    // Những dữ liệu sau khi kéo thả luôn phải đưa về giá trị mặc định ban đầu
    setactiveDragItemID(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  // Custom lại chiến lược thuật toán phát hiện va chạm
  const collisionDetectionStrategy = useCallback((args) => {
    // Trường hợp kéo column thì dùng thuật toán closestCorner
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    // Tìm các điểm giao nhau va chạm với con trỏ
    const pointerIntersections = pointerWithin(args)
    // Nếu không có va chạm nào thì return sớm, tránh gây loop
    if (!pointerIntersections?.length) return []

    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {

      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={mySensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
        <ListColumn
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
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