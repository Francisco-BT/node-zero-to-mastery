const path = require("path");

function getMessages(req, res) {
  res.render("messages", {
    friend: "Elon Musk",
    title: "Messages to my friends",
  });
}

function postMessage(req, res) {
  console.log("Updating messages");
}

module.exports = {
  getMessages,
  postMessage,
};
