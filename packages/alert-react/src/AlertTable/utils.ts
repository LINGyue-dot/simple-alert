import axios from "axios";
import sourceMap from "source-map-js";
import { AlertDataProps, SyntxErrorProps } from "../AlertSDK/core/types";

export async function getSourceCode(
  data: AlertDataProps,
  errorData: SyntxErrorProps
) {
  const sourceData = await getSourMapData(data, errorData.fileName);
  const { sourcesContent, sources } = sourceData;
  let consumer = await new sourceMap.SourceMapConsumer(sourceData);
  let result = consumer.originalPositionFor({
    line: Number(errorData.line),
    column: Number(errorData.column),
  });

  if (result.source && result.source.includes("node_moudles")) {
    // 三方报错解析，缺少三方的 map 文件
    console.log(`三方报错解析，${result.source}`);
    return;
  }

  let index = sources.indexOf(result.source);

  let code = sourcesContent[index];
  let codeList = code.split("\n");
  const row = result.line,
    len = codeList.length - 1;

  const start = row - 5 >= 0 ? row - 5 : 0,
    end = start + 9 >= len ? len : start + 9;

  let newLines = [];
  for (let i = start; i <= end; i++) {
    newLines.push(`
    <div class="code-line ${i + 1 === row ? "height-light" : ""}" >
      ${i}. ${codeList[i].replace(new RegExp(" ", "gm"), "&nbsp;")}
    </div>`);
  }

  return newLines.join(" ");
}

/**
 * sourcemap 名称 => ${project}-${env}-${version}-${fileName}.map
 * @param errorData
 */
export async function getSourMapData(data: AlertDataProps, fileName: string) {
  const baseUrl = `${process.env.REACT_APP_BASEURL}/maps`;
  const { project, env, version } = data;
  const sourceMapName = `${project}-${env}-${version}-${fileName}.map`;
  const url = baseUrl + "/" + sourceMapName;
  const jsonData = (await axios.get(url)).data;
  return jsonData;
}
