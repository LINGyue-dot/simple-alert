const sourceMap = require("source-map");
const fs = require("fs");
const path = require("path");
const targetPath = path.join(__dirname, "..", "maps", "main.5740bc21.js.map");
function getOriginCode() {
  const sourceStr = JSON.parse(fs.readFileSync(targetPath).toString());
  sourceMap.SourceMapConsumer.with(sourceStr, null, (consumer) => {
    const line = 2,
      column = 143532;
    const s = consumer.originalPositionFor({ line, column });
    console.log(`origin code for line ${line} , ${column} \n`);
    console.log("========================================");

    console.log(
      consumer
        .sourceContentFor(s.source)
        .split("\n")
        .slice(Math.max(0, s.line - 10), s.line + 10)
        .join("\n")
    );

    console.log("========================================");
  });
}

getOriginCode();

export {}