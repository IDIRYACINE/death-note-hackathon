import Game from "@/components/game/Game"
import { getServerSideLocales } from "@/lib/locales"


export default function Page(){
    return(
        <Game />
    )
}


export const serverSideProps = getServerSideLocales