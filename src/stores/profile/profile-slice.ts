import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '@/domain/profile'

export interface ProfileState {
    profile: Profile,
    loaded: boolean,
}

const initialState: ProfileState = {
    profile: {
        name: "",
        secret1: "",
        secret2: "",
        secret3: "",
        secret4: "",
        secret5: "",
        background: "",
        profilePicture: "",
    },
    loaded: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload
            state.loaded = true
        },
    },
})

export const { loadProfile } = profileSlice.actions

export default profileSlice.reducer