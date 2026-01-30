// Boards list
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { mockData } from '~/apis/Mock-data'


function Board() {
  return (
    <div className="h-screen flow-root">
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board}/>
    </div>
  )
}

export default Board