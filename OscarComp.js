//  --------------------------------------------------------------------------THIS CODE IS NOT OPERATIONAL YET

// Bring in Data from SQL
var data = [
    {id: 862,
    title: "Toy Story",
    release_date: "1995-10-30",
    runtime: 81,
    adult: false,
    budget: 30000000,
    revenue: 373554033,
    oscar_nominations: true,
    rating: 4.5
    },
    {
    id: 8844,
    title: "Jumanji",
    release_date: "1996-12-15",
    runtime: 104,
    adult: false,
    budget: 65000000,
    revenue: 262797249,
    oscar_nominations: false,
    rating: 3
    },
    {
    id: 31357,
    title: "Waiting to Exhale",
    release_date: "1997-12-22",
    runtime: 127,
    genres: "[{‘id’: 35, ‘name’: ‘Comedy’}, {‘id’: 18, ‘name’: ‘Drama’}, {‘id’: 10749, ‘name’: ‘Romance’}]",
    adult: false,
    budget: 16000000,
    revenue: 81452156,
    oscar_nominations: true,
    rating: 2.5
    },
    {
    id: 11862,
    title: "Father of the Bride Part II",
    release_date: "1998-02-10",
    runtime: 106,
    genres: "[{‘id’: 35, ‘name’: ‘Comedy’}]",
    adult: false,
    budget: 0,
    revenue: 76578911,
    production_companies: "[{‘name’: ‘Sandollar Productions’, ‘id’: 5842}, {‘name’: ‘Touchstone Pictures’, ‘id’: 9195}]",
    imdb_id: "[{‘iso_3166_1’: ‘US’, ‘name’: ‘United States of America’}]",
    oscar_nominations: false,
    rating: 4.5
    },
    {
    id: 862,
    title: "Toy Story",
    release_date: "1995-10-30",
    runtime: 81,
    adult: false,
    budget: 20000000,
    revenue: 273554033,
    oscar_nominations: false,
    rating: 1
    },
    {
    id: 8844,
    title: "Jumanji",
    release_date: "1996-12-15",
    runtime: 104,
    adult: false,
    budget: 6000000,
    revenue: 232797249,
    oscar_nominations: true,
    rating: 5
    },
    {
    id: 31357,
    title: "Waiting to Exhale",
    release_date: "1997-12-22",
    runtime: 127,
    genres: "[{‘id’: 35, ‘name’: ‘Comedy’}, {‘id’: 18, ‘name’: ‘Drama’}, {‘id’: 10749, ‘name’: ‘Romance’}]",
    adult: false,
    budget: 12000000,
    revenue: 71452156,
    oscar_nominations: false,
    rating: 3.25
    },
    {
    id: 11862,
    title: "Father of the Bride Part II",
    release_date: "1998-02-10",
    runtime: 106,
    genres: "[{‘id’: 35, ‘name’: ‘Comedy’}]",
    adult: false,
    budget: 500000,
    revenue: 26578911,
    production_companies: "[{‘name’: ‘Sandollar Productions’, ‘id’: 5842}, {‘name’: ‘Touchstone Pictures’, ‘id’: 9195}]",
    imdb_id: "[{‘iso_3166_1’: ‘US’, ‘name’: ‘United States of America’}]",
    oscar_nominations: true,
    rating: 2.75
    }
];
console.log(data);

//Separate movies into year buckets so we have a set of data for each year
//Use map function to extract years, it will return a list of years
var sortedData = [];
data.map(function(year) {
  sortedData.push(year.release_date)
});
console.log(sortedData);

// Loop through to isolate year
var years = [];
//use .split to pull out parts we want   "1995-12-15"
for (var i = 0; i < sortedData.length; i++) {
  var yr =  sortedData[i].split("-")[0];
  years.push(yr)
};
console.log(years);

//Use for loop to remove duplicated items
var sortedYears = [];
for (var y = 0; y < years.length; y++) {
  var value = years[y];
  if (sortedYears.indexOf(value) == -1) {
    sortedYears.push(value)
  }
};
console.log(sortedYears);

//Sort ascending
var finalYears = sortedYears.sort((a, b) => a - b);
console.log(finalYears);

//for r in finalYears, filter on year and Oscar from original dataset
//  within for loop, calculate average revenue for Oscar winners
var avgRevO = [];
var avgRevN = [];

var oRevenue_sum = 0;
for (var rO = 0; rO < finalYears.length; rO++) {
  oRevenue_sum = 0;
  var filteredYear = data.filter(e => finalYears[rO] == e.release_date.split("-")[0])
  .filter(e => true == e.oscar_nominations);
  //  still in loop, append.avgRevO
  filteredYear.forEach(e => oRevenue_sum += e.revenue);
  // console.log(filteredYear)
  avgRevO.push(oRevenue_sum/filteredYear.length);
};
console.log(avgRevO);

//Repeat for Non-Oscar winner revenue
var nRevenue_sum = 0;
for (var rN = 0; rN < finalYears.length; rN++) {
  nRevenue_sum = 0;
  var filteredYear = data.filter(e => finalYears[rN] == e.release_date.split("-")[0])
  .filter(e => false == e.oscar_nominations);
  filteredYear.forEach(e => nRevenue_sum += e.revenue);
  avgRevN.push(nRevenue_sum/filteredYear.length);
};
console.log(avgRevN);

//Calculate average budget for Oscar winners
var avgBudO = [];
var avgBudN = [];

var oBudget_sum = 0;
for (var bO = 0; bO < finalYears.length; bO++) {
  oBudget_sum = 0;
  var filteredYear = data.filter(e => finalYears[bO] == e.release_date.split("-")[0])
  .filter(e => true == e.oscar_nominations);
  filteredYear.forEach(e => oBudget_sum += e.budget);
  avgBudO.push(oBudget_sum/filteredYear.length);
};
console.log(avgBudO);

//Repeat for Non-Oscar winner budget
var nBudget_sum = 0;
for (var bN = 0; bN < finalYears.length; bN++) {
  nBudget_sum = 0;
  var filteredYear = data.filter(e => finalYears[bN] == e.release_date.split("-")[0])
  .filter(e => false == e.oscar_nominations);
  filteredYear.forEach(e => nBudget_sum += e.budget);
  avgBudN.push(nBudget_sum/filteredYear.length);
};
console.log(avgBudN);

//Calculate average audience ratings for Oscar winners
var avgRateO = [];
var avgRateN = [];

var oRating_sum = 0;
for (var rtO = 0; rtO < finalYears.length; rtO++) {
  oRating_sum = 0;
  var filteredYear = data.filter(e => finalYears[rtO] == e.release_date.split("-")[0])
  .filter(e => true == e.oscar_nominations);
  filteredYear.forEach(e => oRating_sum += e.rating);
  avgRateO.push(oRating_sum/filteredYear.length);
};
console.log(avgRateO);

//Repeat for Non-Oscar winner audience ratings
var nRate_sum = 0;
for (var rtN = 0; rtN < finalYears.length; rtN++) {
  nRate_sum = 0;
  var filteredYear = data.filter(e => finalYears[rtN] == e.release_date.split("-")[0])
  .filter(e => false == e.oscar_nominations);
  filteredYear.forEach(e => nRate_sum += e.rating);
  avgRateN.push(nRate_sum/filteredYear.length);
};
console.log(avgRateN);

//Build plots on html page----------------------------------------------------------------------------------
//x-axis is years, y-axis is values

// Create our first revenue trace
var trace1 = {
  x: finalYears,
  y: avgRevO,
  type: "scatter"
};

// Create our second revenue trace
var trace2 = {
  x: finalYears,
  y: avgRevN,
  type: "scatter"
};

// The data array consists of both traces
var revenue = [trace1, trace2];

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("revenue", revenue);
//------------------------------------------------------------------------------------------------------------------- Revenue

var trace3 = {
  x: finalYears,
  y: avgBudO,
  type: "scatter"
};

var trace4 = {
  x: finalYears,
  y: avgBudN,
  type: "scatter"
};

var budget = [trace3, trace4];

Plotly.newPlot("budget", budget);
//  -----------------------------------------------------------------------------------------------------------------   Budget

var trace5 = {
  x: finalYears,
  y: avgRateO,
  type: "scatter"
};

var trace6 = {
  x: finalYears,
  y: avgRateN,
  type: "scatter"
};

var ratings = [trace5, trace6];

Plotly.newPlot("ratings", ratings);
//  -----------------------------------------------------------------------------------------------------------------   Ratings

