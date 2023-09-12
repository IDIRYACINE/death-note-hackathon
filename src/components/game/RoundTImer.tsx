import { useReadStoreGame } from "@/hooks/useGame";
import { Typography } from "antd";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";
import { useTimer } from "react-timer-hook";


interface RoundTimerProps{
    round: number;
    roundStartTimestamp: number;
    roundDurationInSeconds: number;
}
export default function RoundTimer(){
    const {t} = useTranslation();
    const {roundStartTimestamp,round,roundTimerInSeconds:roundDurationInSeconds} = useReadStoreGame();

    const expiryTimestamp = useMemo(() => new Date(roundStartTimestamp+roundDurationInSeconds*1000),
    [roundStartTimestamp,roundDurationInSeconds]);

    const {seconds, minutes,restart} = useTimer({expiryTimestamp,autoStart:true});


    useEffect(()=>{
        restart(expiryTimestamp)
    },[restart,expiryTimestamp])

    return (
        <Typography.Title level={4}>
            {t("round") } {round} : {minutes}:{seconds}
        </Typography.Title>
    )
}