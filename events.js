const EventEmitter = require("events");

const celebrity = new EventEmitter();

celebrity.on("race", (arg) => {
  if (arg === "win") {
    console.log("Congratulations! You are the best!");
  }
});

celebrity.on("race", (arg) => {
  if (arg === "lost") {
    console.log("Boo I could have better than that!");
  }
});

process.on("exit", (status) =>
  console.log("Process exit with status " + status)
);

celebrity.emit("race", "win");
celebrity.emit("race", "lost");
celebrity.emit("race", "win");
