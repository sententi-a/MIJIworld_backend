import { getTicket } from "../controllers/ticket";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get(
  "/restaurant/ticket/:restName",
  async (req: Request, res: Response) => {
    const restName = req.params.restName.toString();
    const date = req.query.date ? req.query.date.toString() : "";
    const name = req.query.name ? req.query.name.toString() : "";
    const company = req.query.company ? req.query.company.toString() : "";
    const note = req.query.note ? req.query.note.toString() : "";
    const message = req.query.message ? req.query.message.toString() : "";

    try {
      const ticketImage = await getTicket(
        restName,
        date,
        name,
        company,
        note,
        message
      );

      res.setHeader("Content-Type", "image/png");
      res.send(ticketImage);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
