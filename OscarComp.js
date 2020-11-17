//  --------------------------------------------------------------------------THIS CODE IS NOT OPERATIONAL YET

// Bring in Data from SQL
var data = {};

//Separate movies into year buckets so we have a set of data for each year
//Use map function to extract years, it will return a list of years

var sortedData = [];
data.map(function(year) {
  append.sortedData(year.release_date)
});
// Loop through to isolate year
var sortedYears = []
//use .split to pull out parts we want   "1995-12-15"
for i in sortedData, i.split("-")[0]
  append.sortedYears(i)

//Use for loop to remove duplicated items
for y in sortedYears,
  if sortedYears.indexOf(i) < 0:
  append.sortedYears(i)

//Sort ascending


//Loop through new sorted years
var avgRevO = []
var avgRevN = []

//Loop through sorted Years
//for r in sortedYears, filter on year and Oscar from original dataset
//  within for loop, calculate average on list
for r in sortedYears,
  var filteredYear = data.filter(e => r == e.release_date.split("-"[0]))
  .filter(e => true == e.oscar);
  //  still in loop, append.avgRevO
  avgRevO.append(filteredYear.revenue.average)

//Repeat for non-Oscars


//Repeat all for Budget(Oscar & Non-Oscar), repeat all for ratings(Oscar & Non-Oscar)


//x-axis is years, y-axis is values