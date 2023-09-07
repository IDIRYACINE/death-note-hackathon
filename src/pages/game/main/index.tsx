import MainMenu from "@/components/main-menu/MainMenu";
import { getServerSideLocales } from "@/lib/locales";
import { GetServerSideProps } from "next/types";

export default function Page() {
    return (
        <MainMenu/>
    )
}

export const getServerSideProps: GetServerSideProps = getServerSideLocales