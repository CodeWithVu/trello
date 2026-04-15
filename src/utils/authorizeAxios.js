import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'


/**Không thể import {store} trong from '~/redux/store' theo cách thông thường
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
 * Khi ứng dụng chạy lên code sẽ vào main.jsx, từ main ta sẽ gọi hàm injectStore ngay lập tức để gán biến
 * mainStore vào biến axiosReduxStore cục bộ trong file này
 */
let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

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

// Khởi tạo 1 promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trc đó
let refreshTokenPromise = null

// Interceptor response: can thiệp vào giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use(function onFulfilled(response) {
  // chặn spam click
  interceptorLoadingElements(false)

  return response
}, function onRejected(error) {
  interceptorLoadingElements(false)

  // Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
  // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config
  console.log('orgRequest', originalRequests)
  if (error.response?.status === 410 && !originalRequests._retry) {
    // Gán thêm một giá trị ._retry luôn = true trong khoảng thời gian chờ đảm bảo việc refresh chỉ thực hiện 1 lần tại 1 thời điểm
    originalRequests._retry = true

    // Kiểm tra nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đòng thời
    // gán vào cho cái refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // đồng thời accessToken đã nằm trong httpOnly cookie xủ lý từ phía BE
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận bất kỳ lỗi nào từ api refresh token thì log out luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù api có ok hay lỗi thì vẫn luôn gán lại accessTokenPromise về null như ban đầu
          refreshTokenPromise = null
        })
    }
    //Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {
      // B1: Đối với trường hợp nếu dự án cần lưu accessToken vào localStorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây


      // B2: return lại axios Instance của chúng ta kết hợp với các originalRequests để gọi lại những api ban đầu bị lỗi
      return authorizedAxiosInstance(originalRequests)
    })
  }

  // Xử lý tập trung hiển thị thông báo lỗi trả về từ mọi API
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

