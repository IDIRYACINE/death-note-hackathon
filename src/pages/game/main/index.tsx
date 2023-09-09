import MainMenu from "@/components/main-menu/MainMenu";
import { getServerSideLocales } from "@/lib/locales";
import ProfileLoader from "@/lib/stateLoaders/ProfileLoader";

export default function Page() {

    return (
        <>
            <ProfileLoader />
            <MainMenu />

        </>
    )
}

export const getServerSideProps = getServerSideLocales
