import ErrorStackParser from "error-stack-parser";
import { send } from "./transport";
import {
  SyntxErrorProps,
  ErrorEnum,
  ResourceErrorProps,
  PromiseErrorProps,
} from "./types";
import { getFileName } from "./utils";

export function listenSyntxError() {
  window.addEventListener(
    "error",
    (ev) => {
      console.log(`${ErrorEnum.ERROR}:===================== \n`);
      console.log(ev);
      console.log(`${ErrorEnum.ERROR}:===================== \n`);
      // 当在 web worker 中触发，target 为空
      const target = ev.target;

      // JS 语法错误捕获，target 此时为空或者 window
      if (!target || (target && !(target as HTMLElement).localName)) {
        const stackFrame = ErrorStackParser.parse(target ? ev.error : ev)[0];
        const { fileName, columnNumber, lineNumber } = stackFrame;
        const errorData: SyntxErrorProps = {
          type: ErrorEnum.ERROR,
          time: Date.now(),
          message: ev.message,
          fileName: getFileName(fileName!),
          line: lineNumber!,
          column: columnNumber!,
        };
        send(errorData);
      }

      // 加载资源错误
      if ((target as HTMLElement)?.localName) {
        const errorData: ResourceErrorProps = {
          type: ErrorEnum.RESOURCE,
          time: Date.now(),
          message: `${(target as HTMLImageElement).src} 资源加载失败`,
          localName: (target as HTMLElement).localName,
        };
        send(errorData);
      }
    },
    // 优先捕获，避免冒泡时候被 React 先处理
    true
  );
}

export function listenPromiseError() {
  window.addEventListener("unhandledrejection", (ev) => {
    console.log(`${ErrorEnum.PROMISE}:===================== \n`);
    console.log(ev);
    console.log(`${ErrorEnum.PROMISE}:===================== \n`);

    const stackFrame = ErrorStackParser.parse(ev.reason)[0];
    const { fileName, lineNumber, columnNumber } = stackFrame;

    const errorData: PromiseErrorProps = {
      type: ErrorEnum.PROMISE,
      time: Date.now(),
      message: ev.reason.message || ev.reason.stack,
      fileName:getFileName(fileName!),
      line: lineNumber!,
      column: columnNumber!,
    };

    send(errorData)
  });
}

// TODO
export function listenFetchError() {}

export default function initListener() {
  listenSyntxError();
  listenPromiseError();
  listenFetchError();
}
