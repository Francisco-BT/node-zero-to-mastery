const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunche(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);
  return res.sendStatus(201);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunche,
};
