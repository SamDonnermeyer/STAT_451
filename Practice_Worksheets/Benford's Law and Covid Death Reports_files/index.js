const data = [
  { name: "1", score: 80, group: "A" },
  { name: "2", score: 76, group: "A" },
  { name: "3", score: 90, group: "A" },
  { name: "4", score: 82, group: "A"  },
  { name: "1", score: 10, group: "B"  },
  { name: "2", score: 15, group: "B" },
  { name: "3", score: 20, group: "B" },
  { name: "4", score: 25, group: "B"}
];

// Create list of all groups 
var allGroup = d3.map(data, function(d) {
  return(d.group)
}).keys()

//Array of all data groups
console.log(allGroup)

// Designate svg dimensions
const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

// Create SVG object
const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Create x-axis scale
const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

// Create y-axis scale
const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top])

  // add the options to the button
d3.select("#selectButton")
  .selectAll('myOptions')
  .data(allGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// Modify SVG object 
svg
  .append("g")
  //.datum(data.filter(function(d) {return d.name === allGroup[0]}))
  .attr("fill", 'royalblue')
  .selectAll("rect")
  .data(data.filter(function(d) {return d.group === allGroup[0]}))
  //.data(data.sort((a, b) => d3.descending(a.score, b.score)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.score))
    .attr('title', (d) => d.score)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth());


// Function to update chart based on selection 
function update(selectedGroup) {
  console.log("Update")
  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.group == selectedGroup})

  // Give these new data to update line
  svg
    //.datum(dataFilter)
    //.append("g")
    .append("g")
  //.datum(data.filter(function(d) {return d.name === allGroup[0]}))
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.filter(function(d) {return d.group == selectedGroup}))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      .attr('title', (d) => d.score)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.score))
      .attr("width", x.bandwidth())
    .transition()
    .duration(1000)
    
    /*.join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      //.x(function(d) {return x(d.name)})
      //.y(function(d) {return y(d.score)})
    */
    ;
}

// Create yAxis 
function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

// Create xAxis
function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name))
    .attr("font-size", '20px')
}

// When the button is changed, run the updateChart function
d3.select("#selectButton").on("change", function(d) {
  // recover the option that has been chosen
  var selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
  update(selectedOption)
})

// Add Axis and Plots to SVG object
svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();