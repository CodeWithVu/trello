import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


// Khỏi tạo giá trị của một slice trong redux
const initialState= {
  currentUser: null
}


//các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm
// với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)


// Khởi tạo một cái slice trong kho lưu trữ redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducer: xử lý dữ liệu đồng bộ
  reducers: {},
  //Xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      //action.payload ở đây chính là cái respone.data trả về ở trên
      const user = action.payload
      state.currentUser = user
    })
  }
})
// Action creators là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu
// thông qua reducer
// export const {} = userSlice.actions

//Selectors: là nơi cho các components bên dưới gọi bằng hook selector() để lấy dữ liệu từ trong kho redux
export const selectCurrentUser = (state) => {
  return state.user.currentUser // user ở đây là name
}

//cái file này tên là activeBoardSlice nhưng sẽ export một thứ tên là Reducer

// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer