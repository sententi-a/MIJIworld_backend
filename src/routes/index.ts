const express = require("express");
const router = express.Router();

const pinRouter = require("../routes/pin");
const colorRouter = require("../routes/color");
const restRouter = require("../routes/restaurant");
const menuRouter = require("../routes/menu");
const mapRouter = require("../routes/map");
const reviewRouter = require("../routes/review");
const ticketRouter = require("../routes/ticket");
const dbRouter = require("../routes/dbSetup");

router.use(
  "/",
  pinRouter,
  colorRouter,
  restRouter,
  menuRouter,
  mapRouter,
  reviewRouter,
  ticketRouter,
  dbRouter
);

module.exports = router;
