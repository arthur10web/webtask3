const express = require('express');
const bodyParser = require('body-parser');
const port = 8082;
const app = express();

app.use(bodyParser.json());

const teams = [{
    id: 0,
    name: 'Real',
    location: "Spain",
    players: [],
    awards: [],
  },
  {
    id: 1,
    name: 'Barsa',
    location: "Spain",
    players: [],
    awards: [],
  },
  {
    id: 2,
    name: 'liverpool',
    location: "England",
    players: [],
    awards: [],
  },
];

app.get('/teams', (req, res) => {
  console.log('Returning teams list');
  res.send(teams);
});

app.post('/assignment_player', (req, res) => {
  const {
    id,
    name,
    surname,
    years,
    team_id
  } = req.body;

  const currentPlayer = {
    id,
    name,
    surname,
    years
  };

  const foundTeam = teams.find((team) => team.id === team_id);
  foundTeam.players.push(currentPlayer);

  res.status(202).header({
    Location: `http://localhost:${port}/teams`
  }).send(currentPlayer);
});

app.post('/assignment_award', (req, res) => {
  const {
    id,
    name,
    team_id
  } = req.body;

  const currentAward = {
    id,
    name
  };

  const foundTeam = teams.find((team) => team.id === team_id);
  foundTeam.awards.push(currentAward);

  res.status(202).header({
    Location: `http://localhost:${port}/teams`
  }).send(currentAward);
});






console.log(`teams service listening on port ${port}`);
app.listen(port);