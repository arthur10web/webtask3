const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 8083;
const teamHost = 8082;
const app = express();

app.use(bodyParser.json());

const awards = [];

app.get('/awards', (req, res) => {
    console.log('Returning awards list');
    res.send(awards);
});

app.post('/awards', (req, res) => {
    request.post(
        {
            headers: {'content-type': 'application/json'},
            url: `http://localhost:${teamHost}/assignment_award`,
            body: JSON.stringify({
                id: req.body.id,
                name: req.body.name,
                team_id: req.body.team_id,
            }),
        },
        (err, userResponse, body) => {
            if (!err) {
                const addedAward = {
                    id: req.body.id,
                    name: req.body.name,
                    team_id: req.body.team_id,
                };
                awards.push(addedAward);
                res.status(202).send(addedAward);
            } else {
                res.status(400).send({problem: `awards Service responded with issue ${err}`});
            }
        }
    );
});

console.log(`awards service listening on port ${port}`);
app.listen(port);
