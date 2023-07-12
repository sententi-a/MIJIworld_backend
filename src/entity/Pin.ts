import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Restaurant } from "./Restaurant";

@Entity()
export class Pin {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key
  @OneToOne(() => Restaurant)
  @JoinColumn()
  rest_name: Restaurant;

  @Column()
  top: number;

  @Column()
  left: number;
}
