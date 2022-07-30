const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1;
const launches = new Map();

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER,
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

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne({}).sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
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

async function scheduleNewLaunch(launch) {
  const newFlightNumeber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumeber,
  });

  await saveLaunch(newLaunch);
}

module.exports = {
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
  getAllLaunches,
  saveLaunch,
};
