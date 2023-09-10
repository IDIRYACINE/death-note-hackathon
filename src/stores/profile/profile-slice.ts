import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Doc, Id } from '@convex/_generated/dataModel'



export interface ProfileState {
    profile: Doc<"players">,
    loaded: boolean,
}

const initialState: ProfileState = {
    profile: {
        _id: "" as Id<"players">,
        tokenIdentifier: "",
        name: "",
        secret1: "",
        secret2: "",
        secret3: "",
        secret4: "",
        secret5: "",
        background: "",
        profilePicture: "",
        _creationTime: 0
    },
    loaded: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadProfile: (state, action: PayloadAction<Doc<"players">>) => {
            state.profile = action.payload
            state.loaded = true
        },
    },
})

export const { loadProfile } = profileSlice.actions

export default profileSlice.reducer