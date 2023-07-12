import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class NaverReviewInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Restaurant)
  @JoinColumn()
  rest_name: Restaurant;

  @Column()
  url: string;

  @Column({ type: "float" })
  score: number;
}
