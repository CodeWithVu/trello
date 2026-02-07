/**
 * Capitalize the first letter of a string
 */
// eslint-disable-next-line no-unused-vars
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Xử lý bug thư viện dnd-kit khi column là rỗng
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}