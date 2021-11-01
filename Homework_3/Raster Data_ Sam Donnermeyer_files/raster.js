// Create Heat Map of Raster Data from Coffee Reviews 
// Data: https://github.com/jldbc/coffee-quality-database/tree/master/data

//import {legend} from "@d3/color-legend"

// set the dimensions and margins of the graph
var margin = {top: 80, right: 50, bottom: 100, left: 100},
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  //.attr("align","center")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var myColor = d3.scaleSequential()
  .interpolator(d3.interpolateBrBG)
  .domain([7, 8.1])

//Read the data
d3.csv("coffee_reviews.csv", function(data) {
// https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  
  svg.append("g")
    .style("font-size", 14)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
  
  svg.append("g")
    .style("font-size", 14)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  /*
  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateBrBG)
    .domain([7, 8.1])
*/

 // Build color scale
  var myColor = d3.scaleLinear()
    .range(["#FFFFFF", "#08198D"])
    .domain([7, 8.2])

/*
var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    //.attr("align", "center")
    .style("background-color", "white")
    .style("padding", "5px")

 ///////////////////////////////////
 // Three function that change the tooltip when user hover / move / leave a cell
 var mouseover = function(d) {
  tooltip
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}
var mousemove = function(d) {
  tooltip
    .html("The exact value of<br>this cell is: " + d.value)
    .style("left", (d3.mouse(this)[0]) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave = function(d) {
  tooltip
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.95)
}
*/
///////////////////////////////////

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.95)
    //.on("mouseover", mouseover)
    //.on("mousemove", mousemove)
    //.on("mouseleave", mouseleave)
})

// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -40)
        .attr("text-anchor", "left")
        .style("font-size", "25px")
        .text("Average Coffee Quality by Elevation");

// Add subtitle to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -10)
        .attr("text-anchor", "left")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("max-width", 800)
        .text("The coffee surveyed is ranked 1-10 by the Coffee Quality Institute's trained reviewers.");

// text label for the x axis
svg.append("text")
  .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Elevation in Meters");

