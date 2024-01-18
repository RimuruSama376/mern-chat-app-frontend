// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',

  initialState: {
    isLoggedIn: false
  },

  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.status
    }
  }
})

export const { setIsLoggedIn } = userSlice.actions
