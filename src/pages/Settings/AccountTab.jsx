import { MdAccountBox, MdAssignmentInd, MdCloudUpload, MdMail } from 'react-icons/md'

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

function AccountTab() {
  const dispath = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  // Những thông tin của user để init vào form (key tương ứng với register phía dưới Field)
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }
  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data

    // Nếu không có sự thay đổi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    // Gọi API...
    toast.promise(
      dispath(updateUserAPI({ displayName })),
      { pending: 'Updating...' }
    ).then(res => {
      if (!res.error) {
        toast.success('User updated successfully!')
      }
    })
  }

  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])
    // // Cách để log được dữ liệu thông qua FormData
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    // Gọi API...
    toast.promise(
      dispath(updateUserAPI(reqData)),
      { pending: 'Updating...' }
    ).then(res => {
      if (!res.error) {
        toast.success('User updated successfully!')
      }
      // Lưu ý: dù có lỗi hay thành công thì cũng phải clear giá trị của file input, nếu không thì không thể chọn cùng
      // 1 file liên tiếp
      e.target.value = ''
    })
  }

  return (
    <div className="flex w-full justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex w-full max-w-md items-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-21 w-21 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xl font-semibold text-slate-600">
              {currentUser?.avatar ? (
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.displayName || 'User avatar'}
                  className="h-full w-full object-cover"
                />
              ) : (
                currentUser?.displayName?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            <label
              title="Upload a new image to update your avatar immediately."
              className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              <MdCloudUpload className="text-base" />
              Upload
              <input type="file" className="sr-only" onChange={uploadAvatar} />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{currentUser?.displayName}</h2>
            <p className="text-sm text-slate-500">@{currentUser?.username}</p>
          </div>
        </div>

        <form className="w-full max-w-md" onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Email</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-500">
                <MdMail className="text-lg" />
                <input
                  disabled
                  defaultValue={currentUser?.email}
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Username</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-500">
                <MdAccountBox className="text-lg" />
                <input
                  disabled
                  defaultValue={currentUser?.username}
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Display Name</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-600 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <MdAssignmentInd className="text-lg" />
                <input
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  {...register('displayName', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
              </div>
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </div>

            <div>
              <button
                className="interceptor-loading w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountTab
