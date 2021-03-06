/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  alias: {
    "@common": "./src/common",
    "@components": "./src/components",
  },
  mount: {
    src: { url: "/", static: false, resolve: true },
    public: { url: "/", static: true, resolve: false },
  },
  plugins: ["@snowpack/plugin-dotenv"],
  routes: [
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */

    polyfillNode: false,

    env: {
      NODE_ENV: true,
    },
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  exclude: ["src/stories/**/*"],
};
