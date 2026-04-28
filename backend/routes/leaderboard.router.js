const express = require("express");
const { verifyAuth } = require("../middlewares/verifyAuth");
const { leaderboard } = require("../controllers/leaderboard.controllers");


const leaderboardRouter = express.Router();

leaderboardRouter.get("/",verifyAuth,leaderboard);

module.exports = {leaderboardRouter}