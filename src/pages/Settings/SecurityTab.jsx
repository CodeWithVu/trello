import { MdLock, MdLockReset, MdLogout, MdPassword } from 'react-icons/md'

import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { logoutUserAPI, updateUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

function SecurityTab() {
  const dispath = useDispatch()
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  const submitChangePassword = (data) => {
    const isConfirmed = window.confirm('You have to login again after successfully changing your password. Continue?')
    if (!isConfirmed) return

    const { current_password, new_password } = data
    // console.log('current_password: ', current_password)
    // console.log('new_password: ', new_password)
    // console.log('new_password_confirmation: ', new_password_confirmation)

    // Gọi API...
    toast.promise(
      dispath(updateUserAPI({ current_password, new_password })),
      { pending: 'Updating...' }
    ).then(res => {
      if (!res.error) {
        toast.success('Change password successfully!')
        dispath(logoutUserAPI(false))
      }
    })
  }

  return (
    <div className="flex w-full justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <MdLogout className="text-amber-600" />
          Security Dashboard
        </h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit(submitChangePassword)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-600 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <MdPassword className="text-lg" />
                <input
                  type="password"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  {...register('current_password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                />
              </div>
              <FieldErrorAlert errors={errors} fieldName={'current_password'} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-600 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <MdLock className="text-lg" />
                <input
                  type="password"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  {...register('new_password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                />
              </div>
              <FieldErrorAlert errors={errors} fieldName={'new_password'} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">New Password Confirmation</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-600 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <MdLockReset className="text-lg" />
                <input
                  type="password"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  {...register('new_password_confirmation', {
                    validate: (value) => {
                      if (value === getValues('new_password')) return true
                      return 'Password confirmation does not match.'
                    }
                  })}
                />
              </div>
              <FieldErrorAlert errors={errors} fieldName={'new_password_confirmation'} />
            </div>

            <div>
              <button
                className="interceptor-loading w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                type="submit"
              >
                Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SecurityTab
