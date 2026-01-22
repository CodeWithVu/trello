import React from 'react'

function AvatarGroup({ children, max }) {
  // Convert children to array to handle slicing safely
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, max)
  const extraCount = childrenArray.length - visibleChildren.length

  return (
    <div role="group" className="flex items-center gap-1">
      {visibleChildren.map((child, index) => {
        // Clone element to add overlapping margin style if it's not the first one
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${index > 0 ? '-ml-2' : ''}`
        })
      })}

      {extraCount > 0 && (
        <div className=" w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-xs font-medium dark:text-gray-900">
          +{extraCount}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
