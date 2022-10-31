const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = 'prod';
const prodUrl = 'https://erikdao.com';
const devUrl = 'http://localhost:8080';
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProd = environment === PROD_ENV;

module.exports = {
  siteName: 'erikdao.com',
  author: 'Erik Dao',
  environment,
  isProd,
  base: {
    site: baseUrl,
  },
  tracking: {
    gtag: 'G-2J02VX8BR7',
  },
};
