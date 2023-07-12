import {
  getRestaurantData,
  getRestDialogData,
  getRestBasicData,
} from "../controllers/restaurant";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

// Fetch restaurants that meet the condition
router.get("/restaurants", async (req: Request, res: Response) => {
  const filter = String(req.query.q);
  const data = await getRestaurantData(filter);

  res.send(data);
});

// Fetch a dialog data(basic data and color data) of a restaurant
router.get("/restaurant/dialog/:name", async (req: Request, res: Response) => {
  const data = await getRestDialogData(req.params.name);
  res.send(data);
});

// Fetch basic data of a restaurant
router.get("/restaurant/:name", async (req: Request, res: Response) => {
  const data = await getRestBasicData(req.params.name);
  res.send(data);
});

module.exports = router;
