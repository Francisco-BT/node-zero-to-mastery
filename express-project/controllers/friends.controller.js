const model = require("../models/friend.model");

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Missing friend name",
    });
  }

  const newFriend = { name: req.body.name, id: model.length + 1 };
  model.push(newFriend);

  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = model[friendId];

  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({
      message: "Friend does not exist",
    });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriend,
};
