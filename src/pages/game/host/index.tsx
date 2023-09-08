import HostCreator from "@/components/host/HostCreator"
import { getServerSideLocales } from "@/lib/locales"

export default function Page(){
    return (
       <HostCreator/>
    )
}


export const getServerSideProps = getServerSideLocales