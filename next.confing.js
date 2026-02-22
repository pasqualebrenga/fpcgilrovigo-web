/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.fpcgil.it" },
      // a volte le immagini stanno anche su questi, meglio autorizzarli:
      { protocol: "https", hostname: "fpcgil.it" },
    ],
  },
};

module.exports = nextConfig;