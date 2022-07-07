import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lineData: undefined,
}

export const lineSlice = createSlice({
  name: 'layer',
  initialState: initialState,
  reducers: {
    addLayer: (state, action) => {
      state.lineData = action.payload
    },
    removeLayer: (state) => {
      state.lineData = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLayer, removeLayer } = lineSlice.actions

export default lineSlice.reducer