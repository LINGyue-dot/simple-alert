import { ErrorDataType } from "./types";

/**
 *
 * @param fileName
 * @returns
 */
export function getFileName(fileName: string) {
  const paths = fileName.split("/");
  return paths[paths.length - 1];
}


export function genErrorDataHash(errorData:ErrorDataType){
    if("fileName" in errorData){
        return `${errorData.type}-${errorData.message}-${errorData.fileName}-${errorData.line}-${errorData.column}`
    }else{
        return `${errorData.type}-${errorData.message}`
    }
}



// 1. coldsail 如何 build 的，注入了哪些 env