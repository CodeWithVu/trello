import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

// Khỏi tạo giá trị của một slice trong redux
const initialState= {
  currentActiveBoard: null
}


//các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm
// với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)


// Khởi tạo một cái slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducer: xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
      const board = action.payload

      //Xử lý dữ liệu nếu cần thiết

      //update lại dữ liệu của active board
      state.currentActiveBoard = board
    }
  },
  //Xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload ở đây chính là cái respone.data trả về ở trên
      const board = action.payload

      // Sắp xếp thứ tự các column luôn trước khi đưa dữ liệu xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // KHi f5 trang web cần xử lý vấn đề kéo thả vào một column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })
      //update lại dữ liệu của active board
      state.currentActiveBoard = board
    })
  }
})
// ASction là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu
// thông qua reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

//Selectors: là nơi cho các components bên dưới gọi bằng hook selector() để lấy dữ liệu từ trong kho redux
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

//cái file này tên là activeBoardSlice nhưng sẽ export một thứ tên là Reducer

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer