import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khởi tạo một đối tượng axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho
// dự án
let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa cho 1 request: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ
// việc sẽ lưu JWT (refresh & access) vào httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

// cấu hình Interceptors
// Interceptor request: can thiệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use((config) => {
  //chặn spam click
  interceptorLoadingElements(true)


  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
}
)

// Interceptor response: can thiệp vào giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use(function onFulfilled(response) {
  // chặn spam click
  interceptorLoadingElements(false)

  return response
}, function onRejected(error) {
  interceptorLoadingElements(false)


  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  // Hiển thị các lỗi lên màn hình ngoại trừ 410 - GONE phục vụ cho việc tự dộng reset lại token
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})


export default authorizedAxiosInstance

