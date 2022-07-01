const http = require("http");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function serverStart() {
  await loadPlanetsData();

  server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

serverStart();
