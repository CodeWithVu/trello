/**
 * Capitalize the first letter of a string
 */
// eslint-disable-next-line no-unused-vars
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}