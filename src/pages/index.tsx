import StartScreen from "@/components/start-screen/StartScreen";
import { getServerSideLocales } from "@/lib/locales";
import { GetServerSideProps } from "next/types";

export default function Home() {
  return (

    <StartScreen />

  )
}


export const getServerSideProps: GetServerSideProps = getServerSideLocales