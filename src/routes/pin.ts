import { getAllPinData } from "../controllers/pin";
import { Response, Request } from "express";

const express = require("express");
const router = express.Router();

router.get("/pins", async (req: Request, res: Response) => {
  const data = await getAllPinData();
  res.send(data);
});

module.exports = router;
