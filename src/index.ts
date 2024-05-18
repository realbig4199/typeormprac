// ES6 모듈 시스템 - import/export 구문
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

// 환경 변수 로드
dotenv.config();
const app = express();

// 미들웨어 설정
// json 형태로 오는 요청의 본문(req.body)을 해석
// 이게 없으면 읽지 못하기 때문에 undefined로 나옴
app.use(express.json());
// 로그를 출력해주는 미들웨어
app.use(morgan("dev"));

// base URL 설정 : 엔드포인트
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 데이터베이스 연결
// data-source.ts에서 만든 AppDataSource를 사용하여 데이터베이스 연결
// initialize 메서드를 사용하여 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// 서버 실행
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});
