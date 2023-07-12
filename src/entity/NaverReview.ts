import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Restaurant } from "./Restaurant";

@Entity()
export class NaverReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.naver_reviews)
  rest_name: Restaurant;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  rate: number;

  @Column()
  content: string;
}
