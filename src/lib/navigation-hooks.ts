import { hostGamePath, joinGamePath, mainMenuPath, rulesPath, startScreenPath,settingsPath } from '@/domain/navigation'
import { useRouter } from 'next/router'


interface NavigationHook {
    navigate: () => void
}


export function useNavigateGame(): NavigationHook {
    const router = useRouter()

    return {
        navigate: () => router.push(mainMenuPath)
    }
}

interface NavigationMainMenuHook {
    navigateHostGame: () => void,
    navigateJoinGame: () => void
    navigateSettings: () => void
    navigateLogout: () => void
    navigateRules: () => void
}

export function useNavigateMainMenu() : NavigationMainMenuHook{
    const router = useRouter()

    return {
        navigateHostGame: () => router.push(hostGamePath),
        navigateJoinGame: () => router.push(joinGamePath),
        navigateSettings: () => router.push(settingsPath),
        navigateLogout: () => router.push(startScreenPath),
        navigateRules: () => router.push(rulesPath)
    }
}