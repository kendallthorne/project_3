let data;

let selector = d3.select("#year")
  .on('change', function() {
    var _year = eval(d3.select(this).property('value'));
    displayHeatMap(_year)
  });


// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 30, left: 250 },
  widthD3 = 1000 - margin.left - margin.right,
  heightD3 = 14100 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#myChart")
  .append("svg")
  .attr("width", widthD3 + margin.left + margin.right)
  .attr("height", heightD3)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + 0 + ")");

let svgAxis = d3.select("#myAxis")
  .append("svg")
  .attr("width", widthD3 + margin.left + margin.right)
  .attr("height", 21)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + (margin.top - 10) + ")")
  .append("g")
  .attr("transform", "translate(0," + 0 + ")")




var myColor = d3.scaleLinear()
  .domain([0, .25, 1, 3, 6])
  .range(["white", "lightblue", "purple", "pink", "yellow"]);


let svgLegend = d3.select("#legend")
  .append("svg")
  .attr("width", widthD3 + margin.left)
  .attr("height", 50)
var key = svgLegend.append("g");

for (var i = 0; i < 100; i++) {
  key.append("rect")
    .attr("x", 6 + i)
    .attr("y", 2)
    .attr("width", 1)
    .attr("height", 18)
    .style("fill", function(d) { return myColor(i * 6 / 100) });
}
key.append("rect")
  .attr("x", 5)
  .attr("y", 0)
  .attr("width", 1)
  .attr("height", 22)
  .style("fill", "black")
key.append("rect")
  .attr("x", 106)
  .attr("y", 0)
  .attr("width", 1)
  .attr("height", 22)
  .style("fill", "black")
key.append("text")
  .attr("x", 0)
  .attr("y", 40)
  .text("0%")
key.append("text")
  .attr("x", 102)
  .attr("y", 40)
  .text("6%")


var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Read the data
d3.csv("output.csv", function(dataLoaded) {
  if (dataLoaded) {
    data = dataLoaded;
    displayHeatMap(1990);
  }
})

let axis = svg.append("g")

function displayHeatMap(_year) {
  // let year = 1990;
  let cols = ["Schizophrenia (%)", "Bipolar disorder (%)", "Eating disorders (%)", "Anxiety disorders (%)", "Drug use disorders (%)", "Depression (%)", "Alcohol use disorders (%)"];

  // format data into something to use in heatmap
  oneYearOfData = data.filter((d) => d.Year == _year);
  let finalData = [];
  oneYearOfData.map((d) => {
    for (const c of cols) {
      finalData.push({ country: d.Entity, property: c, val: d[c] });
    }
  })

  // get a unique list of countries
  let countries = finalData.map(d => d.country);
  countries = [...new Set(countries)];


  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([0, widthD3])
    .domain(cols)
    .padding(0.01);


  svgAxis
    .call(d3.axisTop(x))


  // Build y scales and axis:
  var y = d3.scaleBand()
    .domain(countries)
    .range([0, 14000])
    .padding(0.01);


  axis
    .call(d3.axisLeft(y))

  var boxes = svg.selectAll(".boxes")
    .remove()
    .exit()
    .data(finalData)

  boxes
    .enter()
    .append("rect")
    .attr("class", "boxes")
    .attr("x", function(d) { return x(d.property) })
    .attr("y", function(d) { return y(d.country) })
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function(d) { return myColor(+d.val) })
    .on('mouseover', function(d) {
      d3.select(this).attr('opacity', .5)
      div.transition()
        .duration(200)
        .style("opacity", .9);

      let newHTML =
        `
        <p><strong>${d.country}</strong></p>
       <p>${d.property}</p>
        <p>${d.val}%</p>
        `
      div.html(newHTML)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

    })

    .on('mouseleave', function(d) {
      d3.select(this).attr('opacity', 1)

      div.transition()
        .duration(500)
        .style("opacity", 0);

    })

}