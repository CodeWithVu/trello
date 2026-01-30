const CardMedia = ({ image, title, className }) => {
  return (
    <div><img src={image} alt={title} className={`object-cover rounded-t-md w-full h-35 ${className} ${image ? '' : 'hidden'}`}/></div>
  )
}

export default CardMedia