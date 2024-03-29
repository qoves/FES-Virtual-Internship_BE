const { version } = require("../package.json");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "SkinStric API documentation",
    version,
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: process.env.BASE_URL,
    },
  ],
};

module.exports = swaggerDef;
