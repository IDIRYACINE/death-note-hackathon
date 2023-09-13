import { hostGamePath, joinGamePath, mainMenuPath, rulesPath,  lobbyPath, gamePath, gameOverPath } from '@/domain/navigation'
import {settingsPath, logoutPath, profilePath,} from '@/domain/navigation'
import { useRouter } from 'next/router'



interface NavigationHook {
    navigateHostGame: () => void,
    navigateJoinGame: () => void
    navigateSettings: () => void
    navigateLogout: () => void
    navigateRules: () => void,
    navigateMainMenu: () => void,
    navigateProfile: () => void,
    navigateLobby: (lobbyId:string) => void,
    navigateGame: (lobbyId:string) => void
    navigateGameOver: () => void

}

export function useNavigation() : NavigationHook{
    const router = useRouter()

    return {
        navigateHostGame: () => router.push(hostGamePath),
        navigateJoinGame: () => router.push(joinGamePath),
        navigateSettings: () => router.push(settingsPath),
        navigateLogout: () => router.push(logoutPath),
        navigateProfile: () => router.push(profilePath),
        navigateRules: () => router.push(rulesPath),
        navigateMainMenu : () => router.push(mainMenuPath),
        navigateLobby: (lobbyId:string) => router.push(lobbyPath + lobbyId),
        navigateGame: (lobbyId:string) => router.push(gamePath + lobbyId ),
        navigateGameOver: () => router.push(gameOverPath)
    }
}
