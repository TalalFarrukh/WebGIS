import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: true,
}

export const toggleSlice = createSlice({
  name: 'showNetwork',
  initialState: initialState,
  reducers: {
    toggle: (state) => {
      state.show = !state.show
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = toggleSlice.actions

export default toggleSlice.reducer