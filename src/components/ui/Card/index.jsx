
const Card = ({ className, children }) => {

  return (
    <div className={`mt-2 w-full bg-white shadow-md rounded-md ${className}`}>
      {children}
    </div>
  )
}

export default Card