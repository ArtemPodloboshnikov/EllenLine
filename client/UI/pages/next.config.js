module.exports = {
    async redirects() {
        return [
          {
            source: '/gay',
            destination: '/',
            permanent: true,
          },
        ]
    },
}