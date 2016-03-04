var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

var fs = require('fs');

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
	fs.writeFile('/sys/class/gpio/export', '409', function(err) {
		fs.writeFile('/sys/class/gpio409/direction', 'out', function(err) {
			fs.writeFile('/sys/class/gpio409/value', '0', function(err) {
			        console.log('Finished setup');
			        res.render('index.ejs', {'title': 'RocketCHIP'});
			});
		});
	});

/*
  // Initial Setup
//  execChildProcess("sudo sh -c 'echo 409 > /sys/class/gpio/export'")

 //  .then(function (data) {
    execChildProcess("sudo sh -c 'echo out > /sys/class/gpio/gpio409/direction'")

    .then(function (data) {
      execChildProcess("sudo sh -c 'echo 0 > /sys/class/gpio/gpio409/value'")

      .then(function (data) {
      });

    });
//  });
  */
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
