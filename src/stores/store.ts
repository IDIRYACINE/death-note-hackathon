import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile/profile-slice'
import lobbyReducer from './lobby/lobby-slice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    lobby:lobbyReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch