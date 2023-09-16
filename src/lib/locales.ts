import { GetServerSideProps, GetStaticProps} from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

interface LoadLocales {
  host: string,
  locale: string
}
export async function loadLocales({ host, locale }: LoadLocales): Promise<JSON> {
  const res = await fetch(`${host}/locales/${locale}/common.json`)
  const data = await res.json()

  return data
}

export async function loadRulesLocales({ host, locale }: LoadLocales): Promise<JSON> {
  const res = await fetch(`${host}/locales/${locale}/rules.json`)
  const data = await res.json()
  return data
}

export const getServerSideLocales: GetServerSideProps = async (context) => {

  const locale = context.locale!;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};


export const getStaticServerRulesLocales:GetStaticProps = (async (context) => {

  const locale = context.locale!;
  const rules =  await serverSideTranslations(locale, ['rules'])

  console.log(rules)
  return {
      props: {
        ...rules
      },
  };
}) 

export const makeServerSideRender : GetServerSideProps = async (context) => {
  return {
    props: {}
  }
}