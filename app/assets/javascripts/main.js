var statesArray = [];
var pricesArray = [];
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
    states.forEach(function(state){
      pricesArray.push(state.price);
      statesArray.push(state.name);
    });
    //set parameters for svg container
    var width = 1000;
    var height = 400;

    //set graph grid on the x & y axis
    // var xAxis = d3.svg.axis().scale(statesArray)
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    //set scaling functions&parameters based on dataset
    var yScale = d3.scale.linear()
    .domain([d3.min(pricesArray)-0.1, d3.max(pricesArray)])
    .range([0, height]);

    var xScale = d3.scale.ordinal()
    .domain(d3.range(50))
    .rangeRoundBands([0, width],0.05);

    //append container to body tag
    var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    //D3 Magic: selects all rect tags
    svg.selectAll('rect')
    //attach data to rect tags
    .data(states)
    .enter()
    //append rect tags to svg container and set attributes
    .append('rect')
    .attr('x', function(d,i){
      return xScale(i);
    })
    .attr('y', function(d, i){
      return height-(yScale(d.price));
    })
    .attr('height', function(d,i){
      return yScale(d.price);
    })
    .attr('width', xScale.rangeBand());


  });//---end of done function---
}//----end of function---


