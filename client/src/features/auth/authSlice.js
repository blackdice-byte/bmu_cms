import { createSlice } from '@reduxjs/toolkit'
import { readStoredAuth, writeStoredAuth } from '@/lib/axiosInstance'

const stored = readStoredAuth()

const initialState = {
  token: stored?.token || null,
  user: stored?.user || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
      writeStoredAuth({ token: state.token, user: state.user })
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }
      writeStoredAuth({ token: state.token, user: state.user })
    },
    logout(state) {
      state.token = null
      state.user = null
      writeStoredAuth(null)
    },
  },
})

export const { setCredentials, updateUser, logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)
