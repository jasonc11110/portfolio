/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/marvel", destination: "/marvel.html" },
      { source: "/marvel/", destination: "/marvel.html" },
    ]
  },
  async headers() {
    return [
      {
        source: "/marvel",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/marvel.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]
  },
}

export default nextConfig
