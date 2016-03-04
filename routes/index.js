var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
require('shelljs/global');

function execChildProcess(cmd) {
  return new Promise(function (resolve, reject) {

    exec(cmd, function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);

      if (code === 0) {
        resolve(stdout);
      }
      else {
        reject(stderr);
      }
    });

  });
}

router.get('/', function(req, res, next) {
  // Initial Setup
  execChildProcess("sudo sh -c 'echo 409 > /sys/class/gpio/export'")

  .then(function (data) {
    execChildProcess("sudo sh -c 'echo out > /sys/class/gpio/gpio409/direction'")

    .then(function (data) {
      execChildProcess("sudo sh -c 'echo 0 > /sys/class/gpio/gpio409/value'")

      .then(function (data) {
        console.log('Finished setup');
        res.render('index.ejs', {'title': 'RocketCHIP'});
      });

    });
  });
  
});

router.post('/trigger/on', function (req, res) {
  console.log('/trigger/on: On Button was pushed!');

  execChildProcess("sudo sh -c 'echo 1 > /sys/class/gpio/gpio409/value'")
  .then(function (data) {
    res.sendStatus(200);
  });
});

router.post('/trigger/off', function (req, res) {
  console.log('/trigger/off: Trigger off!');

  execChildProcess("sudo sh -c 'echo 0 > /sys/class/gpio/gpio409/value'")
  .then(function (data) {
    res.sendStatus(200);
  });
});


module.exports = router;
