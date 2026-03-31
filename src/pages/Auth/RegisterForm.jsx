// TrungQuanDev: https://youtube.com/@trungquandev
import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import TrelloIcon from '~/assets/trello.svg?react'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, PASSWORD_RULE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE_MESSAGE, EMAIL_RULE_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const submitRegister = (data) => {
    console.log('data register', data)
  }


  return (
    // <form onSubmit={handleSubmit(submitRegister)}>
    <form className="auth-form-enter" style={{ animationDelay: '200ms' }} onSubmit={handleSubmit(submitRegister)}>
      <div className="w-96 bg-white rounded-lg shadow-lg mt-24 pt-4">
        {/* Avatars */}
        <div className="m-4 flex justify-center gap-1">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
            <FaLock className="text-white" />
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
            <TrelloIcon className="text-white" />
          </div>
        </div>

        {/* Author */}
        <div className="mt-4 flex justify-center text-gray-500">
          Author: TrungQuanDev
        </div>

        {/* Form Fields */}
        <div className="px-4 pb-4">
          <div className="mt-4">
            <input
              autoFocus
              type="text"
              placeholder="Enter Email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'email'} />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter Password..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'password'} />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter Password Confirmation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register('password_confirmation', {
                validate: (value) => {
                  // eslint-disable-next-line react-hooks/incompatible-library
                  if (value === watch('password')) return true
                  return PASSWORD_CONFIRMATION_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 pb-4">
          <button
            type="submit"
            className="interceptor-loading w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
        </div>

        {/* Login Link */}
        <div className="px-4 pb-4 text-center">
          <p className="text-gray-700">Already have an account?</p>
          <Link to="/login" className="no-underline">
            <p className="text-blue-600 hover:text-yellow-400 font-semibold">Log in!</p>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
