const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  team: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  stats: {
      type: String,
      required: false,
      trim: true
  },
  isCaptain: {
    type: Boolean,
    required: false,
    trim: true
  }
});

playerSchema.methods.toJSON = function () {
  const player = this;
  const playerObject = player.toObject();
  return playerObject;
};

const Player = mongoose.model("player", playerSchema);

playerSchema.statics.findByTeam = async (teamName) => {
  const player = await Player.findOne({ teamName });
  return player;
};



module.exports = Player;
