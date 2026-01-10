// Boards list
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  )
}

export default Board