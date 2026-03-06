import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '69aac17a5ceb831148196915'

    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board}/>
    </div>
  )
}

export default Board