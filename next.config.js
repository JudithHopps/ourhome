/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["mall.ourhome.co.kr"],
  },
  env: {
    REACT_APP_API_END_POINT: process.env.REACT_APP_API_END_POINT,
  },
};

module.exports = nextConfig;
