const { Router } = require("express");

const { httpGetAllLaunches } = require("./launches.controller");

const launchesRouter = Router();

launchesRouter.get("/launches", httpGetAllLaunches);

module.exports = launchesRouter;
