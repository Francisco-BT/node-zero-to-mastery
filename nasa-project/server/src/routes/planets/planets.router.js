const { Router } = require("express");

const { getAllPlanets } = require("./planets.controller");

const planetsRouter = Router();

planetsRouter.get("/planets", getAllPlanets);

module.exports = planetsRouter;
