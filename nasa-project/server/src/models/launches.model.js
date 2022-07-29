const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: latestFlightNumber,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};
saveLaunch(launch);

async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      __v: 0,
      _id: 0,
    },
  );
}

function existLaunchWithId(launchId) {
  console.log(launches);
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet was found!');
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true },
  );
}

module.exports = {
  existLaunchWithId,
  abortLaunchById,
  getAllLaunches,
  saveLaunch,
};
