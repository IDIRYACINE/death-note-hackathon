import Profile from "@/components/profile/Profile";
import { getServerSideLocales } from "@/lib/locales";


export default function Page() {
    return <Profile />
}

export const getServerSideProps = getServerSideLocales