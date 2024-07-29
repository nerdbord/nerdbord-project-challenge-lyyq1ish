/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GPT_API_KEY: process.env.GPT_API_KEY,
    URL: process.env.URL,
    DEPLOY_URL: process.env.DEPLOY_URL,
  },
}

export default nextConfig
