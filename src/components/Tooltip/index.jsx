import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.left + window.scrollX + rect.width / 2
      })
    }
    setIsVisible(true)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  return (
    <>
      {/* Trigger element */}
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="flex cursor-pointer"
      >
        {children}
      </div>

      {/* Tooltip được render ra ngoài DOM bằng Portal */}
      {isVisible && createPortal(
        <div
          className="w-20 fixed z-9999 px-2 py-1 bg-gray-800 text-white text-xs rounded -translate-x-1/2 pointer-events-none
                     after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-x-transparent after:border-t-transparent after:border-b-gray-800"
          style={{ top: position.top, left: position.left }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  )
}

export default Tooltip