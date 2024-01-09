/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    userUploadDir: process.env.USER_UPLOAD_DIR || '/tmp/'
  },
}

module.exports = nextConfig
