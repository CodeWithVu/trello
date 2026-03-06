import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id) || []} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col grow min-h-0 overflow-y-auto overflow-x-hidden px-1.25 pt-0 pb-1.25 mx-1.25
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-md
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {cards?.map((card) => {
          return <Card key={card._id} card={card}/>
        })}
      </div>
    </SortableContext>
  )
}

export default ListCards