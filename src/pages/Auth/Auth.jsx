// TrungQuanDev: https://youtube.com/@trungquandev
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import bgImage from '~/assets/auth/login-register-bg.jpg'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url("${bgImage}")`, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)' }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  )
}

export default Auth