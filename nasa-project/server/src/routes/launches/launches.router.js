const { Router } = require("express");

const { getAllLaunches } = require("./launches.controller");

const launchesRouter = Router();

launchesRouter.get("/launches", getAllLaunches);

module.exports = launchesRouter;
