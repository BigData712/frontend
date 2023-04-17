/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "out"
  // async rewrites() {
  //   return [
  //     // Rewrite everything to `pages/index`
  //     {
  //       source: "/:any*",
  //       destination: "/",
  //     },
  //   ];
  // },
}

module.exports = nextConfig
