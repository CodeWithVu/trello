const Card = ({ className, children, ...props }) => {

  return (
    <div className={`mt-2 w-full bg-white shadow-md rounded-md ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card