import Settings from "@/components/settings/Settings";
import { getServerSideLocales } from "@/lib/locales";


export default function Page(){
    return <Settings />
}



export const getServerSideProps = getServerSideLocales