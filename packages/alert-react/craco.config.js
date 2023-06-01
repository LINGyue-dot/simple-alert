const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const AlertPlugin = require("./WebpackPlugin/alertPlugin");

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);
// 由于 craco 加载在 react-scripts 之前，所以需要提前加载 .env 满足插件中传递 env 中的变量
dotenv.config({
  path: resolveApp(".env"),
});

module.exports = {
  webpack: {
    configure: {
      devtool: "source-map",
      output: {
        sourceMapFilename: "maps/[file].map",
      },
    },
    plugins: {
      add: [
        new AlertPlugin({
          project: process.env.REACT_APP_PROJECT,
          env: process.env.NODE_ENV,
          version: process.env.REACT_APP_VERSION,
          url: process.env.REACT_APP_UPLOADURL,
        }),
      ],
    },
  },
};
