import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  users: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    currentUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
    },
    allUsers: (state, action) => {
      state.users = action.payload
    }
  },
})

export const { currentUser, allUsers } = authSlice.actions
export default authSlice.reducer