import { Card } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  AlertDataProps,
  ErrorDataType,
  ErrorEnum,
  ErrorTextMap,
  SyntxErrorProps,
} from "../AlertSDK/core/types";
import { getSourceCode } from "./utils";

export interface AlertItemProps {
  data: AlertDataProps;
  refresh: Function;
}
const AlertItem: React.FC<AlertItemProps> = ({ data, refresh }) => {
  const errorData = useMemo<ErrorDataType>(() => JSON.parse(data.data), [data]);
  const [code, setCode] = useState("");
  useEffect(() => {
    if (errorData.type === ErrorEnum.ERROR) genCode();
  }, []);

  const genCode = async () => {
    const res = await getSourceCode(data, errorData as SyntxErrorProps);
    // @ts-ignore
    setCode(res);
  };

  const handleClick = () => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/repair`, {
        id: data.id,
      })
      .then(() => refresh())
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card
      title={errorData.message}
      extra={
        <a href="#" onClick={handleClick}>
          Fixed
        </a>
      }
      style={{ width: 500 }}
    >
      <p>
        类型：$
        {ErrorTextMap[errorData.type]}
      </p>
      <p></p>

      {errorData.type === ErrorEnum.PROMISE && <div> {errorData.message}</div>}

      {errorData.type === ErrorEnum.RESOURCE && <div> {errorData.message}</div>}

      {errorData.type === ErrorEnum.ERROR && (
        <code
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: code }}
        >
          {}
        </code>
      )}
    </Card>
  );
};

export default AlertItem;
