/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	env: {
		url: "http://localhost:4000",
	},
};

//url: "http://10.0.0.197:4000",
//url: "http://localhost:4000",

module.exports = nextConfig;
