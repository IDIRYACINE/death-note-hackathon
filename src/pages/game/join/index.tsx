import JoinGame from "@/components/host/JoinGame";
import { getServerSideLocales } from "@/lib/locales";



export default function Page(){
    return (
        <JoinGame/>
    )
}

export const getServerSideProps = getServerSideLocales