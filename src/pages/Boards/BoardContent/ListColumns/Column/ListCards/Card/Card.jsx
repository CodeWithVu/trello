import MuiCard from '~/components/ui/Card'
import CardMedia from '~/components/ui/Card/CardMedia'
import CardContent from '~/components/ui/Card/CardContent'
import Button from '~/components/ui/Button'
import { MdGroup, MdAttachFile } from 'react-icons/md'
import { BiSolidCommentDetail } from 'react-icons/bi'

function Card({ card }) {
  return (
    <div>
      <MuiCard>
        {card?.cover && <CardMedia image={card?.cover}/>}
        <CardContent>
          <h1 className="text-md">{card?.title}</h1>
        </CardContent>
        <div className="flex justify-between">
          {!!card?.memberIds.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2  leading-6">
            <MdGroup className="text-lg"/>
            <span className="text-sm">{card?.memberIds.length}</span>
          </Button>
          }
          {!!card?.comments.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
            <BiSolidCommentDetail className="text-lg"/>
            <span className="text-sm">{card?.comments.length}</span>
          </Button>
          }
          {!!card?.attachments.length &&
          <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
            <MdAttachFile className="text-lg"/>
            <span className="text-sm">{card?.attachments.length}</span>
          </Button>
          }
        </div>
      </MuiCard>
    </div>

  )
}

export default Card