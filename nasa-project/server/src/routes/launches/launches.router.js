const { Router } = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunche,
} = require("./launches.controller");

const launchesRouter = Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunche);

module.exports = launchesRouter;
