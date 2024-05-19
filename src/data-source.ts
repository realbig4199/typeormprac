// DB와 연결하는 DataSource 객체를 생성하는 파일
// DataSource 객체를 생성하고, TypeORM을 사용하여 DB와 연결 (index.ts에서 사용)
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // 초기 값은 "test"이기 때문에 알아서 변경 (도커 컨테이너의 POSTGRES_USER와 동일하게 설정)
  password: "password", // 초기 값은 "test"이기 때문에 알아서 변경 (도커 컨테이너의 POSTGRES_PASSWORD와 동일하게 설정)
  database: "postgres", // 초기 값은 "test"이기 때문에 알아서 변경
  synchronize: true,
  logging: false,
  // entities: [User], // entity 폴더에서 만든 클래스들을 여기에 등록
  entities: ["src/entity/*.ts"], // entity 폴더에서 만든 클래스들을 여기에 등록
  migrations: [],
  subscribers: [],
});
