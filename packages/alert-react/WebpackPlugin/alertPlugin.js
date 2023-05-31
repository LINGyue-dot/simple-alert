const fs = require("fs");
const http = require("http");
const path = require("path");
const FormData = require("form-data");

const rootPath = path.resolve(__dirname, "..");
const sourceMapPath = path.resolve(rootPath, "build/maps/static/js");

class AlertPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    compiler.hooks.afterEmit.tapAsync("MyPlugin", (compilation, callback) => {
      // TODO promiseify ==> .then(()=>callback())
      uploadSourceMap(this.options);
      callback();
    });
  }
}

/**
 * 读取 build/maps/static/js 下所有 .map 文件
 * 将其一一上传给服务端
 */
function uploadSourceMap(options) {
  fs.readdir(sourceMapPath, (err, files) => {
    files.forEach((fileName) => {
      const originPath = path.resolve(sourceMapPath, fileName);
      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream(originPath),
        `${options.project}-${options.env}-${options.version}-${fileName}`
      );
      const requestOptions = {
        method: "POST",
        headers: formData.getHeaders(),
      };
      const request = http.request(options.url, requestOptions, (res) => {});
      formData.pipe(request);
    });
  });
}

module.exports = AlertPlugin;
