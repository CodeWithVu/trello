import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoading from '../../components/Loading/PageLoading'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  //Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams()
  // const email = searchParam.get('email')
  // const token = searchParam.get('token')
  const { email, token } = Object.fromEntries([...searchParams])

  // Tạo state để biết verify tài khoản thành công chưa
  const [verified, setVerified] = useState(false)

  // Gọi API để verify tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  // Nếu url có vấn đề không tồn tại 1 trong 2 giá trị email hoặc token thì trả về trang 404
  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // nếu verify chưa xong hiện loading
  if (!verified) return <PageLoading caption="...Đang xác thực tài khoản"/>

  //thành công thì => login cùng giá trị verifyEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />

}

export default AccountVerification