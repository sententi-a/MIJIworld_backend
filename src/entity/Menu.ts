import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
  rest_name: Restaurant;

  @Column()
  order: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
