import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from './pages/Boards'

// sử dụng Outlet của react router dom để hiển thị các child route
const ProtectedRoutes = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  } else return <Outlet />
}


function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes >
      {/* replace true có nghĩa là thay thế route /, tức là route / sẽ không còn trong history browser */}
      <Route path='/' element={<Navigate to="/boards" replace={true}/>}/>
      <Route element={<ProtectedRoutes user={currentUser}/>}>

        {/* Board detail */}
        <Route path='/boards/:boardId' element={<Board />} />
        <Route path='/boards/' element={<Boards />} />

        {/* User Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />

      </Route>
      {/* Authentication */}
      <Route path='/login' element={<Auth />}/>
      <Route path='/register' element={<Auth />}/>
      <Route path='/account/verification' element={<AccountVerification />}/>

      {/* 404 not found */}
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default App
