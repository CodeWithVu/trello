export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyle = 'font-medium rounded'

  const variantStyles = {
    primary: 'text-(--color-primary) border-(--color-primary) border cursor-pointer hover:bg-(--color-primary) hover:text-white'
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2'
  }

  // Lấy class tương ứng, nếu không có thì dùng primary
  const variantClass = variantStyles[variant] || variantStyles.primary
  const sizeClass = sizeStyles[size] || sizeStyles.md


  return (
    <button
      className={`${baseStyle} ${variantClass} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}