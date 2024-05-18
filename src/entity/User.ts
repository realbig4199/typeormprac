import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// User 클래스를 Entity로 정의
// 엔터티가 없다면 직접 SQL을 작성해야 하지만, TypeORM을 사용하면 클래스로 정의하여 사용할 수 있음
// 클래스를 생성한 후 그 안에 컬럼들을 정의해주면 이것은 DB의 테이블과 매핑됨
@Entity() // User 크래스를 데이터베이스의 테이블로 매핑
export class User {
  @PrimaryGeneratedColumn() // id 속성을 기본 키(Primary Key)로 설정하고 자동 증가하는 숫자로 매핑
  id: number;

  @Column() // firstName 속성을 데이터베이스의 클럼으로 매핑
  firstName: string;

  @Column() // lastName 속성을 데이터베이스의 클럼으로 매핑
  lastName: string;

  @Column() // age 속성을 데이터베이스의 클럼으로 매핑
  age: number;
}
