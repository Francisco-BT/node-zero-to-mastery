const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URL = `mongodb+srv://nasa-api:XZGfZJ67vrQB1XI8@cluster0.avszx.mongodb.net/nasa?retryWrites=true&w=majority`;
const server = http.createServer(app);
mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function serverStart() {
  await mongoose.connect(MONGO_URL, {});
  await loadPlanetsData();

  server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

serverStart();
