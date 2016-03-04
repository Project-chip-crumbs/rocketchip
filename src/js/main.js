var $ = require('jquery');
var request = require('request');
var Promise = require('bluebird');

Promise.promisifyAll(request);

$(document).ready(function () {
  var onOptions = {
    'url': 'http://localhost:3000/trigger/on',
    'headers': {'Content-Type': 'application/json'}
  };
  var offOptions = {
    'url': 'http://localhost:3000/trigger/off',
    'headers': {'Content-Type': 'application/json'}
  };

  $('.on-btn').click(function () {
    request.postAsync(onOptions).then(
      function (response) {
        console.log('Response for on button:', response.body);
      }
    );
  });

  $('.off-btn').click(function () {
    request.postAsync(offOptions).then(
      function (response) {
        console.log('Response for off button:', response.body);
      }
    );
  });

});