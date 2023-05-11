// function LineChart(data, {
//     x = ([x]) => x, // given d in data, returns the (temporal) x-value
//     y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
//     z = () => 1, // given d in data, returns the (categorical) z-value
//     title, // given d in data, returns the title text
//     defined, // for gaps in data
//     curve = d3.curveLinear, // method of interpolation between points
//     marginTop = 20, // top margin, in pixels
//     marginRight = 30, // right margin, in pixels
//     marginBottom = 30, // bottom margin, in pixels
//     marginLeft = 40, // left margin, in pixels
//     width = 640, // outer width, in pixels
//     height = 400, // outer height, in pixels
//     xType = d3.scaleUtc, // type of x-scale
//     xDomain, // [xmin, xmax]
//     xRange = [marginLeft, width - marginRight], // [left, right]
//     yType = d3.scaleLinear, // type of y-scale
//     yDomain, // [ymin, ymax]
//     yRange = [height - marginBottom, marginTop], // [bottom, top]
//     yFormat, // a format specifier string for the y-axis
//     yLabel, // a label for the y-axis
//     zDomain, // array of z-values
//     color = "currentColor", // stroke color of line, as a constant or a function of *z*
//     strokeLinecap, // stroke line cap of line
//     strokeLinejoin, // stroke line join of line
//     strokeWidth = 1.5, // stroke width of line
//     strokeOpacity, // stroke opacity of line
//     mixBlendMode = "multiply", // blend mode of lines
//     voronoi // show a Voronoi overlay? (for debugging)
//   } = {}) {
//     // Compute values.
//     const X = d3.group(data, x);
//     const Y = d3.group(data, y);
//     const Z = d3.group(data, z);
//     const O = d3.group(data, d => d);
//     if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
//     const D = d3.group(data, defined);
  
//     // Compute default domains, and unique the z-domain.
//     if (xDomain === undefined) xDomain = d3.extent(X, d => d[0]);
//     if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d[1])];
//     if (zDomain === undefined) zDomain = Z;
//     zDomain = new Set(zDomain);
  
//     // Omit any data not present in the z-domain.
//     const I = d3.range(X.length).filter(i => zDomain.has(Z[i][1]));
  
//     // Construct scales and axes.
//     const xScale = xType(xDomain, xRange);
//     const yScale = yType(yDomain, yRange);
//     const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
//     const yAxis = d3.axisLeft(yScale).ticks(height / 60).tickFormat(yFormat);
  
//     // Compute titles.
//     const T = title === undefined ? Z : title === null ? null : d3.group(data, title);
  
//     // Construct a line generator.
//     const line = d3