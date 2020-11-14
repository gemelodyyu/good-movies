// Create our first trace
var trace1 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [1, 2, 3, 4, 5],
  type: "scatter"
};

// Create our second trace
var trace2 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [6, 7, 8, 9, 10],
  type: "scatter"
};

// The data array consists of both traces
var data = [trace1, trace2];

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("budget", data);
//  -----------------------------------------------------------------------------------------------------------------   Budget

var trace3 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [10, 20, 30, 40, 50],
  type: "scatter"
};

var trace4 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [6, 7, 8, 9, 10],
  type: "scatter"
};

var data = [trace3, trace4];

Plotly.newPlot("revenue", data);
//  -----------------------------------------------------------------------------------------------------------------   Revenue

var trace5 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [10, 20, 30, 40, 50],
  type: "scatter"
};

var trace6 = {
  x: [2016, 2017, 2018, 2019, 2020],
  y: [40, 30, 25, 15, 10],
  type: "scatter"
};

var data = [trace5, trace6];

Plotly.newPlot("ratings", data);
//  -----------------------------------------------------------------------------------------------------------------   Ratings