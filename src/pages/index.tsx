import StartScreen from "@/components/start-screen/StartScreen";
import { getServerSideLocales } from "@/lib/locales";
import { GetServerSideProps } from "next/types";

export default function Home() {
  return (
    <div
      className='flex min-h-screen flex-col items-center justify-center p-24 bg-black'
    >
      <StartScreen />

    </div>
  )
}


export const getServerSideProps:GetServerSideProps = getServerSideLocales