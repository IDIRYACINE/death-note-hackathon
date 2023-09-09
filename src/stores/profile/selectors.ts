import { RootState } from "../store";



export const selectProfileLoadState = (state: RootState) => state.profile.loaded
export const selectProfile = (state: RootState) => state.profile.profile