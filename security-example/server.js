const http = require("http");
const path = require("path");
const express = require("express");
const helmet = require("helmet");

const PORT = 3000;
const app = express();

app.use(helmet());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
  return res.send("Your personal secret is 42!");
});

http.createServer().listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
