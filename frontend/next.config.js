/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    experimental: { esmExternals: true }
}

module.exports = nextConfig
