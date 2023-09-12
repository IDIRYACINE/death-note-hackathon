import { useReadStoreGame } from "@/hooks/useGame";
import { Typography } from "antd";
import { useTranslation } from "next-i18next";
import { useTimer } from "react-timer-hook";


interface RoundTimerProps{
    round: number;
    roundStartTimestamp: number;
    roundDurationInSeconds: number;
}
export default function RoundTimer(){
    const {t} = useTranslation();
    const {roundStartTimestamp,round,roundTimerInSeconds:roundDurationInSeconds} = useReadStoreGame();

    const expiryTimestamp = new Date(roundStartTimestamp + roundDurationInSeconds * 1000);
    const {seconds, minutes} = useTimer({expiryTimestamp,autoStart:true});

    return (
        <Typography.Title level={4}>
            {t("round") } {round} : {minutes}:{seconds}
        </Typography.Title>
    )
}