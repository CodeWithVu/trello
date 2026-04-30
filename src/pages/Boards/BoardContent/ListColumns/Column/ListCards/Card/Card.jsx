import MuiCard from '~/components/ui/Card'
import CardMedia from '~/components/ui/Card/CardMedia'
import CardContent from '~/components/ui/Card/CardContent'
import Button from '~/components/ui/Button'

import { MdGroup, MdAttachFile } from 'react-icons/md'
import { BiSolidCommentDetail } from 'react-icons/bi'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { updateCurrentActiveCard, showModalActiveCard } from '~/redux/activeCard/activeCardSlice'
import { useDispatch } from 'react-redux'

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }
  const dispatch = useDispatch()

  const setActiveCard = () => {
    // cập nhật data cho activeCard trong redux
    dispatch(updateCurrentActiveCard(card))
    dispatch(showModalActiveCard())
  }

  return (
    <div
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}>
      <MuiCard
        onClick={setActiveCard}
        className={`${card?.FE_PlaceholderCard ? 'hidden' : 'block'} border border-transparent hover:border-(--color-primary) dark:hover:border-(--color-primary-dark)`}
      >
        {card?.cover && <CardMedia image={card?.cover}/>}
        <CardContent>
          <h1 className="text-md">{card?.title}</h1>
        </CardContent>
        <div className="flex justify-between">
          {!!card?.memberIds?.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2  leading-6">
            <MdGroup className="text-lg"/>
            <span className="text-sm">{card?.memberIds?.length}</span>
          </Button>
          }
          {!!card?.comments?.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
            <BiSolidCommentDetail className="text-lg"/>
            <span className="text-sm">{card?.comments?.length}</span>
          </Button>
          }
          {!!card?.attachments?.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
            <MdAttachFile className="text-lg"/>
            <span className="text-sm">{card?.attachments?.length}</span>
          </Button>
          }
        </div>
      </MuiCard>
    </div>

  )
}

export default Card