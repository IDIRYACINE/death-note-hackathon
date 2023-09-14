import GameOver from "@/components/game/GameOver";
import { getServerSideLocales } from "@/lib/locales";


export default function Page() {
    return (
        <GameOver/>
    )
}


export const getServerSideProps = getServerSideLocales