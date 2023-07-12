import {
  setupDBfromExcel,
  setupMap,
  setupKakaoReview,
  scrapNaverReviews,
} from "../jobs/db-setup";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get(`/db-setup`, (req: Request, res: Response) => {
  //   setupDBfromExcel();
  //   setupMap();
  //   setupKakaoReview();
  //   scrapNaverReviews();
  //   getAllRestaurantData();
  res.status(200).send("DB setup");
});

module.exports = router;
