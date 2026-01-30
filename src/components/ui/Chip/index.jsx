
export const Chip = ({
  className = '',
  icon,
  label = '',
  clickable = false,
  onClick
}) => {

  return (
    <button
      className={`text-(--color-primary) text-sm font-medium gap-2 flex  
      ${clickable ? 'group relative isolate overflow-hidden bg-transparent hover:rounded-sm hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:ease-in-out cursor-pointer px-2 py-1 ' : 'cursor-default'}
    ${className}`}
      onClick={clickable ? onClick : undefined}
    >
      {clickable && <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full  w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-800 ease-in-out" />}
      {icon && <span className="relative z-10 flex items-center">{icon}</span>}
      <span className="relative z-10">{label}</span>
    </button>
  )
}