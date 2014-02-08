$(document).ready(function(){
  console.log('ready');
  $('#refill').on('click', refillGas);
});

function refillGas() {
  console.log('working');
  $.ajax({
    type: 'GET',
    url: 'http://apify.heroku.com/api/gasprices.json'
  }).done(function(response) {
    console.log(response);
  });
}