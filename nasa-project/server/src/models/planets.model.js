const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const plannets = require('./planets.mongo');

function isHabitablePlanet(plannet) {
  return (
    plannet['koi_disposition'] === 'CONFIRMED' &&
    plannet['koi_insol'] > 0.36 &&
    plannet['koi_insol'] < 1.11 &&
    plannet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'),
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlannet(data);
        }
      })
      .on('error', (err) => {
        return reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = await getAllPlanets();
        console.log(`${countPlanetsFound.length} habitable plannets found`);
        return resolve();
      });
  });
}

function getAllPlanets() {
  return plannets.find({});
}

async function savePlannet(plannet) {
  try {
    await plannets.findOneAndUpdate(
      {
        keplerName: plannet.kepler_name,
      },
      {
        keplerName: plannet.keplerName,
      },
      { upsert: true },
    );
  } catch (error) {
    console.error(`Could not save plannet ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
