const express = require("express");
const cluster = require("cluster");

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // event block is blocked
  }
}

app.get("/", (req, res) => {
  res.send(`Performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  // delay the response
  delay(9000);
  res.send("Ding ding ding!");
});

if (cluster.isMaster) {
  console.log("Master has been started");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker process started");
  app.listen(3000, () => {
    console.log("Server running in port 3000...");
  });
}
