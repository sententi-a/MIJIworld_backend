const readExcelFile = require("read-excel-file/node");
require("dotenv").config();

import { AppDataSource } from "../data-source";
import {
  Restaurant,
  Pin,
  Color,
  Menu,
  Map,
  KakaoReviewInfo,
  KakaoReview,
} from "../entity/index";
import axios from "axios";
import * as cheerio from "cheerio";
const puppeteer = require("puppeteer");
process.setMaxListeners(25);

export const restRepo = AppDataSource.getRepository(Restaurant);
export const pinRepo = AppDataSource.getRepository(Pin);
export const colorRepo = AppDataSource.getRepository(Color);
export const menuRepo = AppDataSource.getRepository(Menu);
export const mapRepo = AppDataSource.getRepository(Map);
export const kakaoReviewInfoRepo = AppDataSource.getRepository(KakaoReviewInfo);
export const kakaoReviewRepo = AppDataSource.getRepository(KakaoReview);

const filename = __dirname + "/../restInfos.xlsx";

const getRestInfoData = async () => {
  const restDatas = [];
  const menuDatas = [];
  const colorDatas = [];
  const pinDatas = [];

  try {
    const rows = await readExcelFile(filename);

    rows.forEach((row, idx) => {
      if (idx !== 0) {
        const restData = {
          en_name: row[1],
          kr_name: row[13],
          country: row[6],
          country_word: row[12],
          address: row[7],
          business_hour: row[8],
          introduction: row[9] + "\n" + row[10],
        };
        restDatas.push(restData);

        let order = 1;
        for (let i = 14; i <= 25; i += 4) {
          if (!row[i]) break;
          const menuData = {
            rest_name: row[1],
            order,
            name: row[i],
            description: row[i + 1] + "\n" + row[i + 2],
            price: parseInt(row[i + 3]),
          };
          menuDatas.push(menuData);
          order += 1;
        }

        const colorData = {
          rest_name: row[1],
          header_color: row[4],
          text_color: row[5],
        };
        colorDatas.push(colorData);

        const pinData = {
          rest_name: row[1],
          top: row[29],
          left: row[30],
        };
        pinDatas.push(pinData);
      }
    });
    return { restDatas, menuDatas, colorDatas, pinDatas };
  } catch (error) {
    console.error("Cannot read Excel File: " + error);
  }
};

export const setupDBfromExcel = async () => {
  try {
    const { restDatas, menuDatas, colorDatas, pinDatas } =
      await getRestInfoData();
    setupRestaurant(restDatas);
    setupMenu(menuDatas);
    setupColor(colorDatas);
    setupPin(pinDatas);
  } catch (error) {
    console.error(error);
  }
};

const setupRestaurant = (datum) => {
  datum.forEach((data) => {
    const each = restRepo.save(data);
  });
};

const setupMenu = (datum) => {
  datum.forEach((data) => {
    const each = menuRepo.save(data);
  });
};

const setupColor = (datum) => {
  datum.forEach((data) => {
    const each = colorRepo.save(data);
  });
};

const setupPin = (datum) => {
  datum.forEach((data) => {
    const each = pinRepo.save(data);
  });
};

const getKakaoMapDocument = async (data) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?category_group_code=FD6&query=${data.kr_name}`,
      { headers: { Authorization: process.env.KAKAO_MAP_REST_API } }
    );
    const body = response.data.documents[0];

    if (body) {
      const document = {
        rest_name: data.en_name,
        kr_name: data.kr_name,
        map_id: body.id,
        place_url: body.place_url,
      };
      return document;
    }
    return undefined;
  } catch (error) {
    console.error(error);
  }
};

export const setupMap = async () => {
  try {
    const datum = await AppDataSource.manager.find(Restaurant, {});
    let results = await Promise.allSettled(datum.map(getKakaoMapDocument));
    results = results.filter((elem: any) => {
      return elem.status !== false && elem.value;
    });

    results.forEach((data: any) => {
      const mapInfo = {
        rest_name: data.value.rest_name,
        kr_name: data.value.kr_name,
        map_id: data.value.map_id,
      };
      mapRepo.save(mapInfo);
    });
  } catch (error) {
    console.error(error);
    console.log("에러 발생");
  }
};

export const setupKakaoReview = async () => {
  try {
    const datum = await AppDataSource.manager.find(Restaurant, {});
    let kakaoMapResults = await Promise.allSettled(
      datum.map(getKakaoMapDocument)
    );
    // Get rid of failed request
    kakaoMapResults = kakaoMapResults.filter((elem: any) => {
      return elem.status !== false && elem.value;
    });
    // Get place_urls
    kakaoMapResults = kakaoMapResults.map((elem: any) => {
      return elem.value;
    });

    let reviewResults: any = await Promise.allSettled(
      kakaoMapResults.map(scrapKakaoReview)
    );

    reviewResults = reviewResults.filter((elem: any) => {
      return elem.status !== false && elem.value;
    });
    // console.log(reviewResults);
    reviewResults.forEach(async (elem: any) => {
      const { reviewInfo, reviews } = elem.value;

      //   const reviewInfoData = await AppDataSource.manager.findOne(
      //     KakaoReviewInfo,
      //     {
      //       where: { rest_name: reviewInfo.rest_name },
      //     }
      //   );

      //   if (reviewInfo.score && !reviewInfoData) {
      // kakaoReviewInfoRepo.save(reviewInfo);
      //   }

      //   reviews.forEach(async (review) => {
      // const reviewData = await AppDataSource.manager.findOne(KakaoReview, {
      //   where: { rest_name: review.rest_name },
      //     // });
      //     if (review.content && !reviewData) {
      //         kakaoReviewRepo.save(review);
      //     }
      //   });
      //   console.log(reviews);
    });

    // const results = await Promise.all(requests);
  } catch (error) {
    console.error(error);
  }
};

const scrapKakaoReview = async (mapData) => {
  try {
    const placeUrl = mapData.place_url;
    // 1. Open browser
    const browser = await puppeteer.launch({ headless: "new" });
    // 2. Open page
    const page = await browser.newPage();
    // 3. Go to Link
    await page.goto(placeUrl);
    // 4. Get HTML data
    const content = await page.content();

    const $ = cheerio.load(content);
    // const reviewScore = $(
    //   `#kakaoWrap > #kakaoContent > #mArticle > div.cont_essential > div:nth-child(1) > div.place_details > div > div > a:nth-child(3) > span.color_b`
    // ).text();
    let reviewScore = $(
      `#mArticle > div.cont_evaluation > div.ahead_info > div > em.num_rate`
    )
      .text()
      .toString()
      .trim();

    reviewScore = reviewScore.replace("점", "");
    const score = parseFloat(reviewScore);

    const reviewInfo = {
      rest_name: mapData.rest_name,
      url: mapData.place_url,
      //   score: reviewScore,
      score,
    };

    const reviews = [];
    const reviewContent = $(
      "#mArticle > div.cont_evaluation > div.evaluation_review > ul > li > div.comment_info > p > span"
    ).each((idx, elem) => {
      const content = $(elem).text();
      reviews.push({
        rest_name: mapData.rest_name,
        content,
      });
    });

    // 5. Close page and browser
    await page.close();
    await browser.close();

    return { reviewInfo, reviews };
  } catch (error) {
    console.error(error);
  }
};

export const scrapNaverReviews = async () => {
  try {
    const datum = await AppDataSource.manager.find(Restaurant, {});
    const responseData = await getNaverPlaceUrl();
    const urls = responseData.filter((elem) => elem.url !== null);
    const reviews = await Promise.allSettled(urls.map(getNaverReview));
    console.log(reviews);
  } catch (e) {
    console.error(e);
  }
};

const getNaverPlaceUrl = async () => {
  const urls = [];
  try {
    const rows = await readExcelFile(filename);

    rows.forEach((row, idx) => {
      if (idx !== 0) {
        urls.push({ rest_name: row[1], url: row[31] });
      }
    });
    return urls;
  } catch (error) {
    console.error(error);
  }
};

const getNaverReview = async (data) => {
  try {
    const link = data.url;
    // 1. Open browser
    const browser = await puppeteer.launch({ headless: "new" });
    // 2. Open page
    const page = await browser.newPage();
    // 3. Go to Link
    await page.goto(link);
    // 4. Get HTML data
    const content = await page.content();

    const $ = cheerio.load(content);
    let reviewScore = $(
      `#app-root > div > div.BXtr_ > div > div.place_section.OP4V8 > div.zD5Nm.f7aZ0 > div.dAsGb > span.PXMot.LXIwF > em`
    ).text();

    console.log(reviewScore);
  } catch (e) {
    console.error(e);
  }
};
