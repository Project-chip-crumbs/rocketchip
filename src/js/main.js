var $ = require('jquery');

$(document).ready(function () {
  // Switch
  var switchBtnRight = $('.switch-button-case.right');
  var switchBtnLeft = $('.switch-button-case.left');
  var activeSwitch = $('.active');
  // Bgs
  var grounded = $('.grounded');
  var spacedOut = $('.space');

  function switchOff(){
    switchBtnRight.removeClass('active');
    switchBtnLeft.addClass('active');
    spacedOut.hide();
    grounded.show();
  }

  function switchOn(){
    switchBtnRight.addClass('active');
    switchBtnLeft.removeClass('active');
    grounded.hide();
    spacedOut.show();
  }

  spacedOut.hide();
  
  switchBtnLeft.on('click', function(){
    $.ajax({
      url: '/trigger/off',
      type: 'POST',
      success: function(response){
        switchOff();
      }
    });
  });

  switchBtnRight.on('click', function(){
    $.ajax({
      url: '/trigger/on',
      type: 'POST',
      success: function(response){
        switchOn();
      }
    });
  });

});