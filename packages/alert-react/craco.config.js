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
          project: "project1",
          env: "test",
          version: "1.0.0",
        }),
      ],
    },
  },
};
