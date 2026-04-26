import { Dialog, DialogPanel } from '@headlessui/react'
import {
  MdAttachFile,
  MdAutoAwesome,
  MdAutoFixHigh,
  MdCancel,
  MdChecklist,
  MdContentCopy,
  MdCreditCard,
  MdDescription,
  MdEvent,
  MdImage,
  MdLabel,
  MdOutlineAdd,
  MdOutlineAddToDrive,
  MdOutlineAspectRatio,
  MdOutlineDvr,
  MdOutlineShare,
  MdPersonOutline,
  MdSubdirectoryArrowRight,
  MdUnarchive
} from 'react-icons/md'

import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveCard,
  clearCurrentActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI } from '~/apis'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'


const sidebarItemClassName = 'flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-[#2f3542] dark:text-sky-300 dark:hover:bg-[#33485D]'
const sidebarItemActiveClassName = 'hover:bg-[#e9f2ff] hover:text-[#0c66e4] dark:hover:bg-[#90caf9] dark:hover:text-[#000000de]'

function ActiveCard() {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)

  // dùng biến check bên board/_id.jsx
  // const [isOpen, setIsOpen] = useState(true)
  const handleCloseModal = () => {
    // setIsOpen(false)
    dispatch(clearCurrentActiveCard())
  }

  // Function dùng dung cho các trường hợp updateCardTitle, desciption, comment,...
  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData)

    //B1: cập nhật lại card đang active trong modal hiển thị
    dispatch(updateCurrentActiveCard(updatedCard))

    //B2: cập nhật lại bản ghi card trong activeBoard (nested Data)
    dispatch(updateCardInBoard(updatedCard))

    return updatedCard
  }

  const onUpdateCardTitle = (newTitle) => {
    console.log(newTitle.trim())
    // Gọi API...
    callApiUpdateCard({
      title: newTitle.trim()
    })
  }

  const onUpdateCardDescription = (newDescription) => {
    // Gọi API...
    callApiUpdateCard({ title: newDescription })
  }

  const onUploadCardCover = (event) => {
    console.log(event.target?.files[0])
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    // Gọi API...
    toast.promise(
      callApiUpdateCard(reqData).finally(() => event.target.value = ''),
      { pending: 'Updating...' })
  }

  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={true}
      onClose={handleCloseModal}
    >
      <div className="fixed inset-0 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-225">
          <DialogPanel className="relative rounded-lg bg-white px-5 pb-5 pt-10 shadow-2xl outline-none dark:bg-[#1A2027]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-2.5 top-3 cursor-pointer text-red-500 transition-colors hover:text-red-400"
            >
              <MdCancel className="h-6 w-6" />
            </button>

            {activeCard?.cover &&
            <div className="mb-4">
              <img
                className="h-80 w-full rounded-md object-cover"
                src={activeCard?.cover}
                alt="card-cover"
              />
            </div>}

            <div className="-mt-3 mb-1 flex items-center gap-2 pr-2.5">
              <MdCreditCard className="h-5 w-5" />

              {/* Feature 01: Xử lý tiêu đề của Card */}
              <ToggleFocusInput
                inputFontSize='22px'
                value={activeCard?.title}
                onChangedValue={onUpdateCardTitle} />
            </div>

            <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-12">
              {/* Left side */}
              <div className="sm:col-span-9">
                <div className="mb-3">
                  <p className="mb-1 font-semibold text-blue-600 dark:text-sky-300">Members</p>

                  {/* Feature 02: Xử lý các thành viên của Card */}
                  <CardUserGroup />
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <MdDescription className="h-5 w-5" />
                    <span className="text-xl font-semibold">Description</span>
                  </div>

                  {/* Feature 03: Xử lý mô tả của Card */}
                  <CardDescriptionMdEditor
                    cardDescriptionProp={activeCard?.description}
                    handleUpdateCardDescription={onUpdateCardDescription}
                  />
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <MdOutlineDvr className="h-5 w-5" />
                    <span className="text-xl font-semibold">Activity</span>
                  </div>

                  {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
                  <CardActivitySection />
                </div>
              </div>

              {/* Right side */}
              <div className="sm:col-span-3">
                <p className="mb-1 font-semibold text-blue-600 dark:text-sky-300">Add To Card</p>
                <div className="flex flex-col gap-2">
                  {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
                  <button type="button" className={`${sidebarItemClassName} ${sidebarItemActiveClassName}`}>
                    <MdPersonOutline className="h-4 w-4" />
                    Join
                  </button>
                  {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
                  <label className={`${sidebarItemClassName} ${sidebarItemActiveClassName}`}>
                    <MdImage className="h-4 w-4" />
                    Cover
                    <input className="sr-only" type="file" onChange={onUploadCardCover} />
                  </label>

                  <button type="button" className={sidebarItemClassName}><MdAttachFile className="h-4 w-4" />Attachment</button>
                  <button type="button" className={sidebarItemClassName}><MdLabel className="h-4 w-4" />Labels</button>
                  <button type="button" className={sidebarItemClassName}><MdChecklist className="h-4 w-4" />Checklist</button>
                  <button type="button" className={sidebarItemClassName}><MdEvent className="h-4 w-4" />Dates</button>
                  <button type="button" className={sidebarItemClassName}><MdAutoFixHigh className="h-4 w-4" />Custom Fields</button>
                </div>

                <hr className="my-2 border-slate-300 dark:border-slate-600" />

                <p className="mb-1 font-semibold text-blue-600 dark:text-sky-300">Power-Ups</p>
                <div className="flex flex-col gap-2">
                  <button type="button" className={sidebarItemClassName}><MdOutlineAspectRatio className="h-4 w-4" />Card Size</button>
                  <button type="button" className={sidebarItemClassName}><MdOutlineAddToDrive className="h-4 w-4" />Google Drive</button>
                  <button type="button" className={sidebarItemClassName}><MdOutlineAdd className="h-4 w-4" />Add Power-Ups</button>
                </div>

                <hr className="my-2 border-slate-300 dark:border-slate-600" />

                <p className="mb-1 font-semibold text-blue-600 dark:text-sky-300">Actions</p>
                <div className="flex flex-col gap-2">
                  <button type="button" className={sidebarItemClassName}><MdSubdirectoryArrowRight className="h-4 w-4" />Move</button>
                  <button type="button" className={sidebarItemClassName}><MdContentCopy className="h-4 w-4" />Copy</button>
                  <button type="button" className={sidebarItemClassName}><MdAutoAwesome className="h-4 w-4" />Make Template</button>
                  <button type="button" className={sidebarItemClassName}><MdUnarchive className="h-4 w-4" />Archive</button>
                  <button type="button" className={sidebarItemClassName}><MdOutlineShare className="h-4 w-4" />Share</button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ActiveCard
