import * as express from "express";
import { Router } from "express";
import { getVideoGames } from "../../controller/games/games.controller";

const games: Router = express.Router();

games.get("/games", getVideoGames);

export default games;
