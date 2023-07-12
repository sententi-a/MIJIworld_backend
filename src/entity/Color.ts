import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Restaurant } from "./Restaurant";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key
  @OneToOne(() => Restaurant)
  @JoinColumn()
  rest_name: Restaurant;

  @Column()
  header_color: string;

  @Column()
  text_color: string;
}
