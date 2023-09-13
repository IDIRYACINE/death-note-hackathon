import StartScreen from "@/components/main-menu/StartScreen";
import { getServerSideLocales } from "@/lib/locales";
import { GetServerSideProps } from "next/types";

export default function Home() {
  return (

    <StartScreen />

  )
}


export const getServerSideProps: GetServerSideProps = getServerSideLocales