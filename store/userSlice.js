// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',

  initialState: {
    isLoggedIn: false,
    name: undefined,
    email: undefined
  },

  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.status
    },
    setUserName: (state, action) => {
      state.name = action.payload.name
    },
    setUserEmail: (state, action) => {
      state.email = action.payload.email
    }
  }
})

export const { setIsLoggedIn, setUserEmail, setUserName } = userSlice.actions
