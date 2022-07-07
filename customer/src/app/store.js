import { configureStore } from '@reduxjs/toolkit'
import lineReducer from '../features/lineSlice'
import toggleReducer from '../features/toggleSlice'

export const store = configureStore({
  reducer: {
    line: lineReducer,
    toggleNetwork: toggleReducer,
  },
})