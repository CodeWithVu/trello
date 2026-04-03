// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import TrelloIcon from '~/assets/trello.svg?react'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, PASSWORD_RULE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE_MESSAGE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogin = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Logging in...' }
    ).then(res => {
      if (!res.error) navigate('/')
    })
  }


  return (
    // <form onSubmit={handleSubmit(submitLogIn)}>
    <form className="auth-form-enter" style={{ animationDelay: '200ms' }} onSubmit={handleSubmit(submitLogin)}>
      <div className="w-96 bg-white rounded-lg shadow-lg mt-24">
        {/* Avatars */}
        <div className="m-4 flex justify-center gap-1 pt-4">
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

        {/* Alerts */}
        <div className="mt-4 flex justify-center flex-col px-4">
          { verifiedEmail &&
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Your email&nbsp;
          <span className="font-bold hover:text-yellow-400">{verifiedEmail}</span>
            &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
        </div>
          }
          {registeredEmail &&
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            An email has been sent to&nbsp;
            <span className="font-bold hover:text-yellow-400">{registeredEmail}</span>
            <br />Please check and verify your account before logging in!
          </div>
          }
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
        </div>

        {/* Submit Button */}
        <div className="px-4 pb-4">
          <button
            type="submit"
            className="interceptor-loading w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </div>

        {/* Register Link */}
        <div className="px-4 pb-4 text-center">
          <p className="text-gray-700">New to Trello MERN Stack Advanced?</p>
          <Link to="/register" className="no-underline">
            <p className="text-blue-600 hover:text-yellow-400 font-semibold">Create account!</p>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
