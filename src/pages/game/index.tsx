import { useNavigateMainMenu } from "@/lib/navigation-hooks"
import { useEffect } from "react"


export default function Page() {
    const navigation = useNavigateMainMenu()

    useEffect(() => {
        navigation.navigateMainMenu()
    }, [navigation])

    return (
        <></>
    )
}
