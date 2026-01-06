export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    const baseStyle = 'font-medium rounded transition-colors'

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600'
    }

    const sizeStyles = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2'
    }

    // Lấy class tương ứng, nếu không có thì dùng primary
    const variantClass = variantStyles[variant] || variantStyles.primary
    const sizeClass = sizeStyles[size] || sizeStyles.md

    return(
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