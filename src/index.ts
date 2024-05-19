// ES6 모듈 시스템 - import/export 구문
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
// AppDataSource를 import
import { AppDataSource } from "./data-source";
// 엔티티 임포트
import { User } from "./entity/User";

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

// CRUD API
// Create(생성) - POST
app.post("/users", async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  console.log(user);
  // console.log(`입력된 데이터 : ${JSON.stringify(user)}`); // JSON.stringify로 객체를 문자열로 변환하여 출력
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

// Read(조회) - GET
// 전체 조회
app.get("/users", async (req, res) => {
  const users = await AppDataSource.getRepository(User).find();
  return res.json(users);
});
// ID로 조회
app.get("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.params.id) });
  return res.json(user);
});

// Update(수정) - PUT
app.put("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.params.id) });
  AppDataSource.getRepository(User).merge(user, req.body);
  const result = await AppDataSource.getRepository(User).save(user);
  return res.json(result);
});

// Delete(삭제) - DELETE
app.delete("/users/:id", async (req, res) => {
  // const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.params.id) });
  // const result = await AppDataSource.getRepository(User).remove(user);
  const result = await AppDataSource.getRepository(User).delete(req.params.id);
  return res.json(result);
});

// 서버 실행
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});
