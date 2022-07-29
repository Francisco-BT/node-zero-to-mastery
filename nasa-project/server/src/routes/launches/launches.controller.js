const {
  existLaunchWithId,
  abortLaunchById,
  getAllLaunches,
  saveLaunch,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
  res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing require launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  await saveLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);

  if (!existLaunchWithId(id)) {
    return res.status(404).json({
      message: 'Launch not found',
    });
  }

  const aborted = abortLaunchById(id);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
