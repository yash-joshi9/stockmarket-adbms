const express = require("express");
const User = require("../models/User");
const Player = require("../models/Players");

const auth = require("../middleware/auth");
const players = require("../allplayers");

var cors = require('cors');
const Team = require("../models/Teams");

var app = express();
app.use(cors())

const router = new express.Router();
const winston = require("winston")

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});



var corsOptions = {
  origin: '*',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//add players to db
// try {
  
//  const eachTeam = players.players;

//  eachTeam.forEach(async function(t) {
//   const player = new Player(t)
//   await player.save()
// }); 
// } catch {

// }


// try {
  
//  const eachTeam = players.teams;

//  console.log(eachTeam)
//  eachTeam.forEach(async function(t) {
//   const team = new Team(t)
//   await team.save()
// }); 
// } catch {

// }

router.post("/users", cors(corsOptions), async (req, res) => {

  let {name, email, phoneNumber, password } = req.body;
  
  password = (Buffer.from(password, 'base64').toString());
  
  const data = {name, email, phoneNumber, password}
  const user = new User(data);

  try {
    const email = req.body.email;
    const isUser = await User.findOne({email});

    if(isUser) {
      return res.status(200).send({ error: "Already registered" })
    }
    logger.log({
      level: "info",
      message: {time: Date.now(), User: email}
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e){
    console.log(e)
    res.sendStatus(400);
  }
});

router.post("/users/login", cors(corsOptions), async (req, res) => {
  try {
    console.log(req.body);
    let {email, password } = req.body;
    
    password = (Buffer.from(password, 'base64').toString());
    
    const user = await User.findByCredentials(
      req.body.email,
      password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    console.error(e);
    res.status(400).send({error: "Wrong email or password "});
  }
});

router.post("/users/id", cors(corsOptions), auth, async (req,res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    res.send({user})
  } catch (error) {
      console.log(error);
      res.status(400).send({error: "failed to fetch the data "});
  }
})

router.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({message: "logout successful"});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
