import { mainMenuPath } from '@/domain/navigation'
import { useRouter } from 'next/router'


interface NavigationHook {
    navigate: () => void
}

export function useNavigateMainMenu(): NavigationHook {
    const router = useRouter()

    return {
        navigate: () => router.push(mainMenuPath)
    }
}