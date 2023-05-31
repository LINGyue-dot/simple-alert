import { AlertOptionsProps } from "./types";

const AlertStore: {
  options: AlertOptionsProps;
  baseUrl: string;
} = {
  // TODO version env 等从 ci 的环境变量中获取
  options: {
    project: "alert",
    version: "1.0.0",
    env: "test",
  },
  baseUrl: "http://123.249.35.73:3200",
};

export default AlertStore;
