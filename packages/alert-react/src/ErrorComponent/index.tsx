import { useState } from "react";

export interface AlertComponentProps {}
const AlertComponent: React.FC<AlertComponentProps> = ({}) => {
  // 1. JS 语法错误、
  // 2. 异步错误
  // 3. 静态资源错误
  // 4. 请求错误

  const handleSyntxError = () => {
    // @ts-ignore
    fn1();

    // 能被 addEventListener('error') 捕获
    setTimeout(() => {
      // @ts-ignore
      fn2();
    }, 10);
  };

  const handlePromiseError = () => {
    new Promise((resolve, reject) => {
      reject(new Error("Promise 错误啊阿啊阿啊阿"));
    });
  };

  const [visible, setVisible] = useState(false);

  const handleStaticError = () => {
    // ??? 这个是什么错误
    // @ts-ignore
    // import("../svg.icon")
    setVisible(true);
  };

  const handleFetchError = () => {};

  return (
    <div style={{ margin: 20 }}>
      <button onClick={handleSyntxError}>JS 语法错误</button>
      <button onClick={handlePromiseError}>Promise 错误</button>
      <button onClick={handleStaticError}>静态资源错误</button>
      <button onClick={handleFetchError}>请求错误</button>

      {visible && <img src="https://test.cn/×××.png" alt=""></img>}
    </div>
  );
};

export default AlertComponent;
