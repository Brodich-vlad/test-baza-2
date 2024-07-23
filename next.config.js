const createNextIntlPlugin = require("next-intl/plugin");
const svg = require("@neodx/svg/webpack");

const withNextIntl = createNextIntlPlugin();
// /** @type {import('next').NextConfig} */
// const path = require('path')

const nextConfig = {
	webpack: (config, { isServer }) => {
		config.resolve.alias.canvas = false;
		if (!isServer) {
			config.plugins.push(
				svg({
					group: true,
					root: "src/components/shared/Icon/assets",
					output: "public/sprite",
					resetColors: false,
					metadata: "src/components/shared/Icon/sprite.gen.ts",
				})
			);
		}
		return config;
	},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
	async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);