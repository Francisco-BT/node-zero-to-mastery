const { Router } = require("express");

const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouter = Router();

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
