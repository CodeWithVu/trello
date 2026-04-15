import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { MdAbc, MdClose, MdDescription, MdLibraryAdd } from 'react-icons/md'
import { createNewBoardAPI } from '~/apis'

// BOARD_TYPES tương tự bên model phía Back-end (nếu cần dùng nhiều nơi thì hãy đưa ra file constants, không thì cứ để ở đây)
const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

/**
 * Bản chất của cái component SidebarCreateBoardModal này chúng ta sẽ trả về một cái SidebarItem để hiển thị ở màn Board List cho phù hợp giao diện bên đó, đồng thời nó cũng chứa thêm một cái Modal để xử lý riêng form create board nhé.
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog, Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì, nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
function SidebarCreateBoardModal({ afterCreateNewBoard }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      type: BOARD_TYPES.PUBLIC
    }
  })

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => {
    setIsOpen(false)
    // Reset lại toàn bộ form khi đóng Modal
    reset()
  }


  const submitCreateNewBoard = (data) => {
    // const { title, description, type } = data
    createNewBoardAPI(data).then(() => {
      // B1: Đóng modal
      handleCloseModal()
      // B2: Thông báo component cha để xử lý
      afterCreateNewBoard()
    })
  }

  // <>...</> nhắc lại cho bạn anof chưa biết hoặc quên nhé: nó là React Fragment, dùng để bọc các phần tử lại mà không cần chỉ định DOM Node cụ thể nào cả.
  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:bg-[#1A2027] dark:text-slate-200 dark:hover:bg-[#33485D]"
      >
        <MdLibraryAdd className="text-lg" />
        Create a new board
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            className="relative w-full max-w-2xl rounded-lg bg-white px-5 py-6 shadow-2xl dark:bg-[#1A2027] sm:px-7"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-board-title"
            aria-describedby="create-board-description"
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-3 top-3 rounded-full p-1 text-red-500 transition hover:bg-red-50 hover:text-red-400"
              aria-label="Close modal"
            >
              <MdClose className="text-2xl" />
            </button>

            <div id="create-board-title" className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <MdLibraryAdd className="text-xl" />
              <h2 className="text-xl font-semibold">Create a new board</h2>
            </div>

            <div id="create-board-description" className="mt-5">
              <form onSubmit={handleSubmit(submitCreateNewBoard)}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="board-title" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Title
                    </label>
                    <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 focus-within:border-blue-500 dark:border-slate-600 dark:bg-slate-900">
                      <MdAbc className="text-lg text-slate-500 dark:text-slate-400" />
                      <input
                        id="board-title"
                        type="text"
                        className="w-full bg-transparent py-2.5 text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                        placeholder="Enter board title"
                        {...register('title', {
                          required: FIELD_REQUIRED_MESSAGE,
                          minLength: { value: 3, message: 'Min Length is 3 characters' },
                          maxLength: { value: 50, message: 'Max Length is 50 characters' }
                        })}
                      />
                    </div>
                    <FieldErrorAlert errors={errors} fieldName={'title'} />
                  </div>

                  <div>
                    <label htmlFor="board-description" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Description
                    </label>
                    <div className="flex items-start gap-2 rounded-md border border-slate-300 bg-white px-3 focus-within:border-blue-500 dark:border-slate-600 dark:bg-slate-900">
                      <MdDescription className="mt-3 text-lg text-slate-500 dark:text-slate-400" />
                      <textarea
                        id="board-description"
                        rows={4}
                        className="w-full resize-none bg-transparent py-2.5 text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                        placeholder="Write board description"
                        {...register('description', {
                          required: FIELD_REQUIRED_MESSAGE,
                          minLength: { value: 3, message: 'Min Length is 3 characters' },
                          maxLength: { value: 255, message: 'Max Length is 255 characters' }
                        })}
                      />
                    </div>
                    <FieldErrorAlert errors={errors} fieldName={'description'} />
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Visibility</p>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <input
                          type="radio"
                          value={BOARD_TYPES.PUBLIC}
                          className="h-4 w-4"
                          {...register('type')}
                        />
                        Public
                      </label>
                      <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <input
                          type="radio"
                          value={BOARD_TYPES.PRIVATE}
                          className="h-4 w-4"
                          {...register('type')}
                        />
                        Private
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="interceptor-loading rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SidebarCreateBoardModal
