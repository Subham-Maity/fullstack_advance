import * as express from "express";
import {Router} from "express";
import games from "./games/games.router";


const router: Router = express.Router();

export default {
    games,
    router,
};