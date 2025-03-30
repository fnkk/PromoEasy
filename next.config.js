module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/promoeasy',
        permanent: true, // 永久重定向
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/launchpad/:path*',
        destination: 'https://renaissance-tcf60.artela.network/:path*'
      },
      {
        source: '/explore/:path*',
        // destination: 'http://35.194.13.183:26656/:path*'
        destination: 'http://34.145.36.46:3389/:path*'
      },
      {
        source: '/vision/type-a',
        destination: '/vision?type=a',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artela-oss.oss-us-west-1.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.galxe.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}