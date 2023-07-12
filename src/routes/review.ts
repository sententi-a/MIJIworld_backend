import { getKakaoReviews } from "../controllers/review";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get(
  "/restaurant/reviews/kakao/:name",
  async (req: Request, res: Response) => {
    const data = await getKakaoReviews(req.params.name);
    res.send(data);
  }
);

module.exports = router;
