var objectsArray = [];
var statesArray = [];
var pricesArray = [];

$(document).ready(function(){
  console.log('ready');
  getStates();

}); //-----closes document on ready----


//function that makes ajax to database and populates the empty arrays
//after response, function then calls another function that creates the
//graph based on json objects

function getStates() {
  console.log('states');
  $.ajax({
    type: 'GET',
    url: '/states',
    dataType: 'json'
}).done(function(states) {
    states.forEach(function(state){
      objectsArray.push(state);
      pricesArray.push(state.price);
      statesArray.push(state.name);
  });
    createGraph();
    createTable();
  });
}

function createGraph(){
    // set parameters for svg container
    var width = 1200;
    var height = 400;

    //set scaling functions&parameters based on dataset
    var yScale = d3.scale.linear()
        .domain([d3.min(pricesArray)-0.1, d3.max(pricesArray)])
        .range([height, 0]);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(objectsArray.length))
        .rangeRoundBands([0, width],0.05);

    //set graph grid on the x & y axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickFormat(function(d){
            return objectsArray[d].name;
        });
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

    //append container to body tag
    var svg = d3.select('body')
        .append('svg')
            .attr('width', width+100)
            .attr('height', height+150)
        .append('g')
            .attr("transform", "translate(20,20)");

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,400)')
    .call(xAxis)
    .selectAll('text')
        .style("text-anchor", "middle")
        .style('text-align', 'right')
        .attr("dx", "-60px")
        .attr("dy", "-7")
        .attr('transform', 'rotate(-90)');

    svg.append('g')
        .attr('class', 'y axis')
        .attr("transform", "translate(25, 0)")
        .call(yAxis);

    //D3 Magic: selects all rect tags
    svg.selectAll('rect')
        .data(objectsArray)
        .enter().append('rect')
            .attr('x', function(d,i){
                return xScale(i);
            })
            .attr('y', function(d,i){
                return yScale(d.price);
            })
            .attr('height', function(d, i){
                return height-(yScale(d.price));
            })
            .attr('width', xScale.rangeBand());
}

function createTable() {
    var table = d3.select('body')
        .append('table'),
        thead = table.append('thead'),
        tbody = table.append('tbody');

    thead.append('tr')
        .selectAll("th")
        .data(d3.keys(objectsArray[0]))
        .enter().append("th")
        .text(function(d){
            return d;
        });

    var rows = tbody.selectAll('tr')
        .data(objectsArray)
        .enter()
        .append('tr');

    $('tbody').children().each(function(index, value){
        var date = new Date(objectsArray[index].created_at);
        date = date.getMonth()+'/'+ date.getDate()+'/'+ date.getYear()+' at '+ date.getHours()+':'+date.getMinutes();
        $(value).append('<td>'+date+'</td>');
        $(value).append('<td>'+objectsArray[index].id+'</td>');
        $(value).append('<td>'+objectsArray[index].name+'</td>');
        $(value).append('<td>'+objectsArray[index].price+'</td>');
    });
    $("table th:last-child").remove();
    $("table th:nth-child(2)").remove();
    $("table tr td:nth-child(2)").remove();
}

