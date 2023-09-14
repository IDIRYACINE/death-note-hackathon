import { GetServerSideProps, GetStaticProps, GetStaticPropsContext, PreviewData } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ParsedUrlQuery } from "querystring"

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


export function withGetServerSideLocale (fun:GetServerSideProps): GetServerSideProps  {

  const localGetServerSideProps: GetServerSideProps = async (context) => {

    const localeProps = await getServerSideLocales(context);
    const props = await fun(context);
    return {
      props: {
        ...localeProps,
        ...props
      }
    }
  }

  return localGetServerSideProps
}

export async function serverFetchLocales (context:GetStaticPropsContext<ParsedUrlQuery, PreviewData>) {
  
    const locale = context.locale!;


    return {
      ...(await serverSideTranslations(locale, ['common'])),
    };
}

export const getStaticServerRulesLocales:GetStaticProps = (async (context) => {

  const locale = context.locale!;

  return {
      props: {
        ...(await serverSideTranslations(locale, ['common','rules'])),
      },
  };
}) 