import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Restaurant } from "./Restaurant";

@Entity()
export class KakaoReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.kakao_reviews)
  rest_name: Restaurant;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  rate: number;

  @Column()
  content: string;
}
