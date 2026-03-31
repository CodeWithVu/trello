import { Routes, Route, Navigate } from 'react-router-dom'


import Board from './pages/Boards'
import NotFound from './pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'


function App() {

  return (
    <Routes >
      <Route path='/' element={<Navigate to="/boards/69aee80b5e5150e63541866b" replace={true}/>}/>


      <Route path='/boards/:boardId' element={<Board />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />}/>
      <Route path='/register' element={<Auth />}/>

      {/* 404 not found */}
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default App
