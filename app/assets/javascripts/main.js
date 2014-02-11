var statesArray = [];
$(document).ready(function(){
  console.log('ready');
  getStates();



}); //-----closes document on ready----


function getStates() {
  console.log('states');
  $.ajax({
    type: 'GET',
    url: '/states',
    dataType: 'json'
  }).done(function(states) {
    states.forEach(
      function pushName(object){
        statesArray.push(object.name);
      }
      );
    d3.select('body')
    .append('svg')
    .selectAll('rect')
    .data(states)
    .enter()
    .append('rect')
    .attr('height', 20)
    .attr('y', function(d,i){
      return i * 24;
    })
    .attr('width', function(d,i){
      return 100 * d.price;
    });
  });

}


