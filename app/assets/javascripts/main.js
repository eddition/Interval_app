$(document).ready(function(){
  console.log('ready');
  refillGas();
});

function refillGas() {
  console.log('working');
  $.ajax({
    type: 'GET',
    url: '/states',
    dataType: 'json'
  }).done(function(response) {
    console.log(response);
    // $('body').append('<ul>').attr('id', 'states');
    $.each(response, function(index, object){
      $('body').append('<p>'+object.name+'</p>');
      $.ajax({
        type: 'GET',
        url: '/prices'
      })
    });
  });
}