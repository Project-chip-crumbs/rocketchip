var express = require('express');
var fs = require('fs');
var Promise = require('bluebird');
var router = express.Router();

router.get('/', function(req, res, next) {
  // Initial Setup
  fs.writeFile('/sys/class/gpio/export', '409', function(err) {
    fs.writeFile('/sys/class/gpio409/direction', 'out', function(err) {
      fs.writeFile('/sys/class/gpio409/value', '0', function(err) {
        console.log('Finished setup');
        res.render('index.ejs', {'title': 'RocketCHIP'});
      });
    });
  });
});

router.post('/trigger/on', function (req, res) {
  console.log('/trigger/on: On Button was pushed!');

  fs.writeFile('/sys/class/gpio/gpio409/value', '1', function(err) {
    res.sendStatus(200);
  });
});

router.post('/trigger/off', function (req, res) {
  console.log('/trigger/off: Trigger off!');

  fs.writeFile('/sys/class/gpio/gpio409/value', '0', function(err) {
    res.sendStatus(200);
  });
});

module.exports = router;
