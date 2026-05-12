import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoSearch } from 'react-icons/io5'
import { BOARD_BACKGROUNDS } from '~/utils/constants'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { updateBoardDetailsAPI } from '~/apis'
import { useSelector, useDispatch } from 'react-redux'


function ChangeBackgroundModal({ isOpen, handleClose }) {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.activeBoard.currentActiveBoard)

  const handleChangeBackground = (bgObject) => {
    // Tạo một object mới chỉ chứa các thông tin cần thiết để tránh làm hỏng cấu trúc board
    const updateData = {
      ...board,
      backgroundImage: bgObject.url,
      backgroundBrightness: bgObject.brightness
    }
    // 1. Update Redux
    dispatch(updateCurrentActiveBoard(updateData))
    // 2. Gọi API
    updateBoardDetailsAPI(board._id, {
      backgroundImage: bgObject.url,
      backgroundBrightness: bgObject.brightness
    })
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-1000 " onClose={handleClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-50 items-start justify-end p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Đây là khung nội dung Modal - Canh chỉnh vị trí ở đây */}
              <Dialog.Panel className="flex flex-col mt-12 h-[500px] w-full max-w-xs transform overflow-hidden rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 w-full text-center">
                    Thay đổi hình nền
                  </Dialog.Title>
                  <button onClick={handleClose} className="text-gray-500 hover:text-black">X</button>
                </div>
                <div className="flex items-center w-full h-[35px] border-[#172b4d] focus-within:border-[#0052cc] focus-within:border-2 rounded-md border shadow-b-[#091e4224] outline-none">
                  <IoSearch className="ml-2 mr-2" />
                  <input type='text' className="h-full w-full outline-none" placeholder='Ảnh' />
                </div>

                {/* Khu vực Grid ảnh sẽ nằm ở đây */}
                <div className="grid grid-cols-2 gap-2 mt-3 overflow-y-auto ">
                  {BOARD_BACKGROUNDS.map((bg) => (
                    <div key={bg.id} onClick={() => handleChangeBackground(bg)}
                      className="cursor-pointer group relative h-24 w-full overflow-hidden rounded-md border-2 border-transparent hover:border-blue-500 transition-all"
                    >
                      <img
                        src={bg.url}
                        alt={bg.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" >
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ChangeBackgroundModal