import { AppDataSource } from "../data-source";
import {
  Restaurant,
  KakaoReview,
  NaverReview,
  KakaoReviewInfo,
  NaverReviewInfo,
} from "../entity";

export const getKakaoReviews = async (name: string) => {
  try {
    const restData = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });

    const overviewData = await AppDataSource.manager.findOne(KakaoReviewInfo, {
      where: { rest_name: restData },
    });

    const reviews = await AppDataSource.manager.find(KakaoReview, {
      where: { rest_name: restData },
    });

    // console.log(reviews);

    const result = {
      overview: { ...overviewData },
      reviews: [...reviews],
    };
    return result;
  } catch (e) {
    console.error(e);
  }
};
