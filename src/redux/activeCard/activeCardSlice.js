import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo 1 giá trị của một slice trong reduxs
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    // Clear data và đóng modal activecard
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      state.currentActiveCard = fullCard
      state.isShowModalActiveCard = Boolean(fullCard)
    }
  },
  extraReducers: () => {}
})

export const { clearCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard?.currentActiveCard ?? state.card?.currentActiveCard ?? null
}

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard?.isShowModalActiveCard ?? state.card?.isShowModalActiveCard ?? false
}

export const activeCardReducer = activeCardSlice.reducer