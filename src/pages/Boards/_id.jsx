import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDiffentColumnsAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { Circle } from 'rc-progress'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '69aee80b5e5150e63541866b'

    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự các column luôn trước khi đưa dữ liệu xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // KHi f5 trang web cần xử lý vấn đề kéo thả vào một column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })


      setBoard(board)
    })
  }, [])

  // Function này có nhiệm vụ tạo mới column và làm mới dữ liệu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    //Khi tạo column mới chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]


    // Cập nhật state board
    const newBoard = { ...board }
    newBoard.columns = [...newBoard.columns, createdColumn]
    newBoard.columnOrderIds = [...newBoard.columnOrderIds, createdColumn._id]
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
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
    setBoard(newBoard)
  }

  // Func này gọi API và xử lý khi kéo thả column xong
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  // Khi di chuyển card trong cùng column: chỉ cần gọi API để cập nhật mảng cardOrderIds chứa nó (thay đổi vị trí trong mảng)
  const moveCardInTheSameColumn = ( dndOrderedCards, dndOrderedCardIds, columnId ) => {
    //Update cho chuẩn dữ liệu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    // Gọi API update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Khi di chuyển card sang một column khác:
  // B1: nhập nhật mảng cardOrderIds của column ban đầu chứa nó
  // B2: cập nhật mảng cardOrderIds tiếp theo nhận card
  // B3: cập nhật lại trường columnId mới của card đã kéo
  const moveCardToDiffentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API xử lý phia BE
    // nếu kéo card cuối cùng ra khỏi column thì cần xóa đi card placeholder trước khi gửi dữ liệu cho BE
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0]?.includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    let nextCardOrderIds = dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    if (nextCardOrderIds[0]?.includes('placeholder-card')) {
      nextCardOrderIds = []
    }
    moveCardToDiffentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds
    })
  }

  const deleteColumnDetails = (columnId) => {
    //Update dữ liệu state cho board
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    // Gọi API
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (
      <div className="w-50 h-50 ">
        <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
      </div>
    )
  }


  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDiffentColumn={moveCardToDiffentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </div>
  )
}

export default Board