
const CardContent = ({ children, className }) => {
  return (
    <div className={`my-1 px-2 py-2 ${className}`}> {children}</div>
  )
}

export default CardContent