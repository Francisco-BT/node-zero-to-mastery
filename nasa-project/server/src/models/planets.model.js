const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
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
          await savePlanet(data);
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

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    },
  );
}

async function savePlanet(planet) {
  try {
    await planets.findOneAndUpdate(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.keplerName,
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
