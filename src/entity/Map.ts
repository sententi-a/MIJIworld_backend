import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Restaurant } from "./Restaurant";

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Restaurant)
  @JoinColumn()
  rest_name: Restaurant;

  @Column()
  kr_name: string;

  @Column()
  map_id: string;
}
