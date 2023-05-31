const AlertPlugin = require("./WebpackPlugin/alertPlugin");

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
        // process.env.NODE_ENV !== "development" &&
        new AlertPlugin({
          project: process.env.REACT_APP_PROJECT,
          env: process.env.NODE_ENV,
          version: process.env.REACT_APP_VERSION,
          url:process.env.REACT_APP_UPLOADURL,
        }),
      ],
    },
  },
};
