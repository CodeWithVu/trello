

// Component này có nhiệm vụ trả về một Alert Message cho field chỉ định (nếu có).
function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null
  return (
    <div
      role="alert"
      className="mt-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 wrap-break-word"
    >
      {errors[fieldName]?.message}
    </div>
  )
}

export default FieldErrorAlert
