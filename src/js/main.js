var $ = require('jquery');

$(document).ready(function () {

  $('.on-btn').click(function () {
    $.ajax({
      url: '/trigger/on',
      type: 'POST',
      success: function(response){
        console.log('on');
      }
    });
  });

  $('.off-btn').click(function () {
    $.ajax({
      url: '/trigger/off',
      type: 'POST',
      success: function(response){
        console.log('off');
      }
    });
  });

});