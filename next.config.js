
const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "antd": {
      transform: "antd/es/{{loweCase member}}",
    },
    "@ant-design/icons": {
      transform: "@ant-design/icons/lib/icons/{{member}}",
    },
  },
  typescript: { ignoreBuildErrors: false }
}



module.exports = nextTranslate(nextConfig)
