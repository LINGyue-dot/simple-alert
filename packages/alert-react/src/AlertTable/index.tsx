import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertDataProps } from "../AlertSDK/core/types";
import AlertItem from "./AlertItem";

export interface AlertTableProps {}
const AlertTable: React.FC<AlertTableProps> = ({}) => {
  const [list, setList] = useState<AlertDataProps[]>([]);

  const getData = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/all`).then((r) => setList(r.data.data));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(process.env)

  return (
    <div style={{ marginLeft: 50 }}>
      <Button onClick={() => getData()}>刷新</Button>
      {list.reverse().map((item) => (
        <div style={{ margin: 20 }} key={item.id}>
          <AlertItem data={item} refresh={getData} />
        </div>
      ))}
    </div>
  );
};

export default AlertTable;
