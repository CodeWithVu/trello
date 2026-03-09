import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { updateBoardDetailsAPI } from '../../apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '69aee80b5e5150e63541866b'

    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
        return {
          ...column,
          cards: [...column.cards, createdCard],
          cardOrderIds: [...column.cards.map(c => c._id), createdCard._id]
        }
      }
      return column
    })
    setBoard(newBoard)
  }

  // Func này gọi API và xử lý khi kéo thả column xong
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }


  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}/>
    </div>
  )
}

export default Board