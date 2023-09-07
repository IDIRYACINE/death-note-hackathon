import { GetServerSideProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

interface LoadLocales{
    host:string,
    locale:string
}
export async function loadLocales({host,locale} : LoadLocales) : Promise<JSON>{
    const res = await  fetch(`${host}/locales/${locale}/common.json`)
    const data = await res.json()

    return data
}

export const getServerSideLocales : GetServerSideProps = async (context) => {

    const  locale  = context.locale!;
    const host = process.env.HOST_URL!;
    
    const data = await loadLocales({locale,host});
  
    return {
      props: {
  
        ...(await serverSideTranslations(locale, ['common'])),
  
        data,
      },
    };
  };

