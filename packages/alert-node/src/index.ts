import express from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from 'body-parser' 
import {
  addAlertData,
  getAlertData,
  getSpecialAlertData,
  updateFixed,
} from "./mysql";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
const port = 3200;
app.use(cors());

app.use(bodyParser.json());

app.use("/maps", express.static("uploads"));


app.post("/sourceMap", upload.single("file"), function (req, res, next) {
  res.send("xxxxx");
});

app.post("/report", function (req, res, next) {
  console.log(req.body);
  addAlertData(req.body.alertData);
  res.send("xxxx");
});

app.get("/all", function (req, res, next) {
  getAlertData().then((list) => {
    res.send({
      data: list,
    });
  });
});

app.get("/data/:id", function (req, res, next) {
  getSpecialAlertData(req.params.id).then((item) => {
    res.send({
      data: item,
    });
  });
});

app.put("/repair", function (req, res, next) {
  updateFixed(req.body.id);
  res.send("xxx");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// 1. 上报接口
// 2. 检索全部报警信息接口
// 3. fix 接口
