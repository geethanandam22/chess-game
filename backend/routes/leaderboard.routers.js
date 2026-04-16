const express = require("express");
const { verifyAuth } = require("../middlewares/verifyAuth");
const { leaderboard } = require("../controllers/leaderboard.controlers");


const leaderboaardRouter = express.Router();

leaderboaardRouter.get("/",verifyAuth,leaderboard);

module.exports = {leaderboaardRouter}