import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Menu } from "./Menu";
import { NaverReview } from "./NaverReview";
import { KakaoReview } from "./KakaoReview";

@Entity()
export class Restaurant {
  @PrimaryColumn()
  en_name: string;

  @Column()
  kr_name: string;

  @Column()
  address: string;

  @Column()
  business_hour: string;

  @Column()
  introduction: string;

  @Column()
  country: string;

  @Column()
  country_word: string;

  @OneToMany(() => Menu, (menu) => menu.rest_name)
  menus: Menu[];

  @OneToMany(() => NaverReview, (naverReview) => naverReview.rest_name)
  naver_reviews: NaverReview[];

  @OneToMany(() => KakaoReview, (kakaoReview) => kakaoReview.rest_name)
  kakao_reviews: KakaoReview[];
}
