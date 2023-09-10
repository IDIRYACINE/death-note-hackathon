import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { loadProfile } from "@/stores/profile/profile-slice";
import { selectProfile, selectProfileLoadState } from "@/stores/profile/selectors";
import {  useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "@convex/_generated/api";

export const useLoadProfile = () => {

    const profile = useQuery(api.player.loadPlayerProfile)
    const dispatch = useAppDispatch()
    const isProfileLoaded = useAppSelector(selectProfileLoadState)


    useEffect(() => {
        console.log(profile)
        if (!isProfileLoaded && profile) {
            dispatch(loadProfile(profile))
        }
    }, [dispatch, isProfileLoaded, profile])

    return isProfileLoaded
}

export const useReadStoreProfile = () => {
    const profile = useAppSelector(selectProfile)
    return profile
}