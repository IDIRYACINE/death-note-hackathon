import Rules from '@/components/rules/Rules';
import { getStaticServerRulesLocales } from '@/lib/locales';


export default function Page() {
    return (
        <Rules />
    )
}


export const getStaticProps = getStaticServerRulesLocales