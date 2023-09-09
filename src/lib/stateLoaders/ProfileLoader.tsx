import { useLoadProfile } from "@/hooks/useProfile"
import { useConvexAuth } from "convex/react";


function ProfileInjector() {
    useLoadProfile()

    return null
}

export default function ProfileLoader() {

    const { isAuthenticated } = useConvexAuth();

    return isAuthenticated? <ProfileInjector />:null
}