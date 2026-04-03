function PageLoading({ caption }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <span className="text-gray-500">{caption}</span>
      </div>
    </div>
  )
}

export default PageLoading