import ListColumn from './ListColumns/ListColumns'

function BoardContent({ board }) {
  return (
    <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
      <ListColumn columns={board?.columns}/>
    </div>
  )
}

export default BoardContent