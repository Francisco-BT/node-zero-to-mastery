const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1;

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
  return await launches.find(
    {},
    {
      __v: 0,
      _id: 0,
    },
  );
}

async function existLaunchWithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    },
  );

  return aborted.modifiedCount === 1;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet was found!');
  }

  await launches.updateOne(
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
