/**
 * Author: TrungQuanDev - Một Lập Trình Viên
 * YouTube: https://youtube.com/@trungquandev
 */
import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { MdSearch } from 'react-icons/md'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { fetchBoardAPI } from '~/apis'
import { useDebounceFn } from '~/customHook/useDebounceFn'

/**
 * Hướng dẫn & ví dụ cái Autocomplele của MUI ở đây:
 * https://mui.com/material-ui/react-autocomplete/#asynchronous-requests
 */
function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  // State xử lý hiển thị kết quả fetch về từ API
  const [open, setOpen] = useState(false)
  // State lưu trữ danh sách board fetch về được
  const [boards, setBoards] = useState(null)
  // Sẽ hiện loading khi bắt đầu gọi api fetch boards
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // State và Ref để tính toạ độ render ra ngoài DOM
  const containerRef = useRef(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })

  const noOptionsText = useMemo(() => {
    if (!boards) return 'Type to search board...'
    if (boards.length === 0) return 'No board found!'
    return ''
  }, [boards])

  useEffect(() => {
    if (!open) return
    const updatePos = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDropdownPos({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        })
      }
    }
    updatePos()
    window.addEventListener('resize', updatePos)
    window.addEventListener('scroll', updatePos, true)
    return () => {
      window.removeEventListener('resize', updatePos)
      window.removeEventListener('scroll', updatePos, true)
    }
  }, [open])

  // Xử lý việc gọi API
  // Phải bọc trong useCallback để object function không bị tạo lại mỗi lần setInputValue làm re-render
  // Nếu ko tạo lại function mới -> useDebounceFn sẽ hiểu là function cũ và delay đúng thay vì reset delay
  const handleSearchBoard = useCallback((searchValue) => {
    if (!searchValue) return

    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`

    setLoading(true)
    fetchBoardAPI(searchPath)
      .then(res => {
        setBoards(res.boards || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) // Không có dependencies nào vì ở đây chỉ đơn thuần là gọi API

  // Khởi tạo debounce cho việc search
  const debounceSearchBoard = useDebounceFn(handleSearchBoard, 1000)

  // Hàm handle change cho thẻ input
  const handleInputSearchChange = (event) => {
    const value = event.target?.value
    setInputValue(value)
    // Gọi debounce truyền value vào
    debounceSearchBoard(value)
  }

  // Khi chúng ta select chọn một cái board cụ thể thì sẽ điều hướng tới board đó luôn
  const handleSelectedBoard = (event, selectedBoard) => {
    // Phải kiểm tra nếu tồn tại một cái board cụ thể được select thì mới gọi điều hướng - navigate
    // console.log(selectedBoard)
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`)
    }
  }

  return (
    <div className="relative w-55" ref={containerRef}>
      <label className="sr-only" htmlFor="asynchronous-search-board">
        Type to search...
      </label>
      <div className="flex items-center gap-2 rounded-md border border-slate-400 dark:border-white/70 bg-transparent px-2 py-1.5">
        <MdSearch className="h-4 w-4" />
        <input
          id="asynchronous-search-board"
          className="w-full bg-transparent text-sm placeholder-slate-400 dark:placeholder-white/80 outline-none"
          placeholder="Type to search..."
          value={inputValue}
          onChange={handleInputSearchChange}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false)
            setBoards(null)
          }}
          autoComplete="off"
        />
        {loading && (
          <span className="inline-flex h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-400 dark:border-white/70 border-t-transparent" />
        )}
      </div>

      {open && createPortal(
        <div
          className="absolute z-9999 mt-1 rounded-md border border-slate-200 bg-white shadow-lg"
          style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px`, width: `${dropdownPos.width}px` }}
        >
          {(!boards || boards.length === 0) && (
            <div className="px-3 py-2 text-sm text-slate-500">
              {noOptionsText}
            </div>
          )}

          {boards && boards.length > 0 && (
            <ul className="max-h-64 overflow-auto py-1">
              {boards.map((board) => (
                <li key={board._id}>
                  <button
                    type="button"
                    className="flex w-full items-center px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    onMouseDown={(event) => {
                      handleSelectedBoard(event, board)
                      setOpen(false)
                    }}
                  >
                    {board.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}

export default AutoCompleteSearchBoard
