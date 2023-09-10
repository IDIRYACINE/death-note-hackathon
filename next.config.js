const { i18n } = require('./next-i18next.config.js');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  modularizeImports: {
    "antd": {
      transform: "antd/es/{{loweCase member}}",
    },
    "@ant-design/icons": {
      transform: "@ant-design/icons/lib/icons/{{member}}",
    },
  }
}



module.exports = nextConfig
