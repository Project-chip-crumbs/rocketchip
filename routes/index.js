var express = require('express');
var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var router = express.Router();

function spawnChildProcess(cmd, args) {
  if (!args) args = [];

  return new Promise(function (resolve, reject) {

    var child = spawn(cmd, args);

    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      resolve(data);
    });

    child.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      reject(data);
    });

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}

router.get('/', function(req, res, next) {
  // Initial Setup
  spawnChildProcess('sudo sh', ['-c', 'echo 409 > /sys/class/gpio/export'])

  .then(function (data) {
    spawnChildProcess('sudo sh', ['-c', 'echo out > /sys/class/gpio/gpio409/direction'])

    .then(function (data) {
      res.render('index.ejs', {'title': 'RocketCHIP'});
    });
  });
});

router.post('/trigger/on', function (req, res) {
  console.log('/trigger/on: On Button was pushed!');

  spawnChildProcess('sudo sh', ['-c', 'echo 0 > /sys/class/gpio/gpio409/value'])
  .then(function (data) {
    res.sendStatus(200);
  });
});

router.post('/trigger/off', function (req, res) {
  console.log('/trigger/off: Trigger off!');

  spawnChildProcess('sudo sh', ['-c', 'echo 1 > /sys/class/gpio/gpio409/value'])
  .then(function (data) {
    res.sendStatus(200);
  });
});


module.exports = router;
