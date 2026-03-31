import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDiffentColumnsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'

import { fetchBoardDetailsAPI, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  //Không dùng State nữa vì dùng state của redux
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '69aee80b5e5150e63541866b'
    dispatch(fetchBoardDetailsAPI(boardId))

  }, [dispatch, boardId])


  // Func này gọi API và xử lý khi kéo thả column xong
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    // ở đây dùng spread operator để copy shallow được vì ở dưới newBoard.columns = dndOrderedColumns => đã tạo 1 mảng mới chứ ko tác động trực tiếp mảng cũ
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  // Khi di chuyển card trong cùng column: chỉ cần gọi API để cập nhật mảng cardOrderIds chứa nó (thay đổi vị trí trong mảng)
  const moveCardInTheSameColumn = ( dndOrderedCards, dndOrderedCardIds, columnId ) => {
    //Update cho chuẩn dữ liệu state board
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    // Gọi API update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Khi di chuyển card sang một column khác:
  // B1: nhập nhật mảng cardOrderIds của column ban đầu chứa nó
  // B2: cập nhật mảng cardOrderIds tiếp theo nhận card
  // B3: cập nhật lại trường columnId mới của card đã kéo
  const moveCardToDiffentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    // Tương tự như xử lý moveDifferenceColumn => không ảnh hưởng đến redux vì dùng mảng mới chứ ko sửa trực tiếp mảng
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

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


  if (!board) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          <span className="text-gray-500">Đang tải board...</span>
        </div>
      </div>
    )
  }


  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        // createNewColumn={createNewColumn}
        // createNewCard={createNewCard}
        // deleteColumnDetails={deleteColumnDetails}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDiffentColumn={moveCardToDiffentColumn}
      />
    </div>
  )
}

export default Board