//Bring in the data from SQL
var yearData = [];
var years = [];
var sortedYears = [];
var avgRevO = [];
var avgRevN = [];
var avgBudO = [];
var avgBudN = [];
var avgRateO = [];
var avgRateN = [];

var data = d3.json("/api/comparison").then(data => {
  console.log(data)
  data.map(function(year) {
    yearData.push(year.release_date)
  });
  //Separate movies into year buckets so we have a set of data for each year
  //Use map function to extract years, it will return a list of years
  // console.log(yearData);
  // Loop through to isolate year
  
  //use .split to pull out parts we want   "1995-12-15"
  for (var i = 0; i < yearData.length; i++) {
    var yr =  yearData[i].split("-")[0];
    years.push(yr);
  };
  //Use for loop to remove duplicated items
  for (var y = 0; y < years.length; y++) {
    var value = years[y];
    if (sortedYears.indexOf(value) == -1) {
    sortedYears.push(value)
  }
  };
  // console.log(sortedYears);

  //Sort ascending
  var finalYears = sortedYears.sort((a, b) => a - b);
  // console.log(finalYears);

  //for r in finalYears, filter on year and Oscar from original dataset
  //  within for loop, calculate average revenue for Oscar winners
  var oRevenue_sum = 0;
  for (var rO = 0; rO < finalYears.length; rO++) {
    oRevenue_sum = 0;
  var filteredYear = data.filter(e => finalYears[rO] == e.release_date.split("-")[0])
  .filter(e => e.oscar_nominations !== null);
  //  still in loop, append.avgRevO
  filteredYear.forEach(e => oRevenue_sum += e.revenue);
  if (filteredYear.length > 0) {
  avgRevO.push(oRevenue_sum/filteredYear.length);
    }
  };
  console.log(avgRevO);

  //Repeat for Non-Oscar winner revenue
  var nRevenue_sum = 0;
  for (var rN = 0; rN < finalYears.length; rN++) {
    nRevenue_sum = 0;
    var filteredYear = data.filter(e => finalYears[rN] == e.release_date.split("-")[0])
    .filter(e => e.oscar_nominations === null);
    filteredYear.forEach(e => nRevenue_sum += e.revenue);
    if (filteredYear.length > 0) {
    avgRevN.push(nRevenue_sum/filteredYear.length);
    }
  };
  console.log(avgRevN);

  //Calculate average budget for Oscar winners
  var oBudget_sum = 0;
  for (var bO = 0; bO < finalYears.length; bO++) {
    oBudget_sum = 0;
    var filteredYear = data.filter(e => finalYears[bO] == e.release_date.split("-")[0])
    .filter(e => e.oscar_nominations !== null);
    filteredYear.forEach(e => oBudget_sum += e.budget);
    if (filteredYear.length > 0) {
    avgBudO.push(oBudget_sum/filteredYear.length);
    }
  };
  console.log(avgBudO);

  //Repeat for Non-Oscar winner budget
  var nBudget_sum = 0;
  for (var bN = 0; bN < finalYears.length; bN++) {
    nBudget_sum = 0;
    var filteredYear = data.filter(e => finalYears[bN] == e.release_date.split("-")[0])
    .filter(e => e.oscar_nominations === null);
    filteredYear.forEach(e => nBudget_sum += e.budget);
    if (filteredYear.length > 0) {
    avgBudN.push(nBudget_sum/filteredYear.length);
    }
  };
  console.log(avgBudN);

  //Calculate average audience ratings for Oscar winners
  var oRating_sum = 0;
  for (var rtO = 0; rtO < finalYears.length; rtO++) {
    oRating_sum = 0;
    var filteredYear = data.filter(e => finalYears[rtO] == e.release_date.split("-")[0])
    .filter(e => e.oscar_nominations !== null);
    filteredYear.forEach(e => oRating_sum += e.ratings);
    if (filteredYear.length > 0) {
    avgRateO.push(oRating_sum/filteredYear.length);
    }
  };
  console.log(avgRateO);

  //Repeat for Non-Oscar winner audience ratings
  var nRate_sum = 0;
  for (var rtN = 0; rtN < finalYears.length; rtN++) {
    nRate_sum = 0;
    var filteredYear = data.filter(e => finalYears[rtN] == e.release_date.split("-")[0])
    .filter(e => e.oscar_nominations === null);
    filteredYear.forEach(e => nRate_sum += e.ratings);
    if (filteredYear.length > 0) {
    avgRateN.push(nRate_sum/filteredYear.length);
    }
  };
  console.log(avgRateN);

  //Build plots on html page----------------------------------------------------------------------------------
  //x-axis is years, y-axis is values

  // Create our first revenue trace
  var trace1 = {
    x: finalYears,
    y: avgRevO,
    name: "Oscar",
    type: "scatter",
    line: {
      color: '#ffbf00'
    }
  };

  // Create our second revenue trace
  var trace2 = {
    x: finalYears,
    y: avgRevN,
    name: "Non",
    type: "scatter",
    line: {
      color: '#000000'
    }
  };

  // The data array consists of both traces
  var revenue = [trace1, trace2];
  var layoutr = {
    title: "Revenue: Oscar Nominated Vs. Non-Oscar Nominated"
  };

  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("revenue", revenue, layoutr);
  //------------------------------------------------------------------------------------------------------------------- Revenue

  var trace3 = {
    x: finalYears,
    y: avgBudO,
    name: "Oscar",
    type: "scatter",
    line: {
      color: '#ffbf00'
    }
  };

  var trace4 = {
    x: finalYears,
    y: avgBudN,
    name: "Non",
    type: "scatter",
    line: {
      color: '#000000'
    }
  };

  var budget = [trace3, trace4];
  var layoutb = {
    title: "Budget: Oscar Nominated Vs. Non-Oscar Nominated",
  };

  Plotly.newPlot("budget", budget, layoutb);
  //  -----------------------------------------------------------------------------------------------------------------   Budget

  var trace5 = {
    x: finalYears,
    y: avgRateO,
    name: "Oscar",
    type: "scatter",
    line: {
      color: '#ffbf00'
    }
  };

  var trace6 = {
    x: finalYears,
    y: avgRateN,
    name: "Non",
    type: "scatter",
    line: {
      color: '#000000'
    }
  };

  var ratings = [trace5, trace6];
  var layoutrt = {
    title: "Audience Ratings: Oscar Nominated Vs. Non-Oscar Nominated"
  }

  Plotly.newPlot("ratings", ratings, layoutrt);
//  -----------------------------------------------------------------------------------------------------------------   Ratings

});           //-------------------------------------------------------------------------------PUT EVERYTHING BEFORE THIS LINE


