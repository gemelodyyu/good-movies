// from data.js
var tableData = data;

// Find html tags/selectors
var thead = d3.select("thead");
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var submit = d3.select("form")


// Define function that appends values from key,value pairs in each "data" object 
// entry to a table
function tabler(data) {
    data.forEach(function(ufo) {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(function([key,value]) {
            row.append("td").text(value);
        });
    });
};

// Create unfiltered table
tabler(tableData);

console.log(tableData[0])

// Define filter function
function filterer(data, att, value) {
    var filteredArray = data.filter(function(data) {
        return data[att] == value});
    return filteredArray;
};

// Define function to make table for filtered date
function handle() {
    d3.event.preventDefault();
    var yearInput = d3.select("#Year").property("value");
    var titleInput = d3.select("#Title").property("value");
    var directorInput = d3.select("#Director").property("value");
    var actorInput = d3.select("#Actors").property("value");
    var imdbInput = d3.select("#IMDB").property("value");

    var inputs = [yearInput, titleInput, directorInput, actorInput, imdbInput];
    var atts = ["Year", "Title", "Director", "Actors", "IMDB"];
    var specifiedInputs = [];
    var specifiedAtts = [];
    
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i] != "") {
            specifiedInputs.push(inputs[i]);
            specifiedAtts.push(atts[i]);
        };
    };

    var currentArray = filterer(tableData, specifiedAtts[0], specifiedInputs[0]);

    for (var i=1; i < specifiedInputs.length; i++) {
        var filtered = filterer(currentArray, specifiedAtts[i], specifiedInputs[i]);
        currentArray = filtered;
    };

    // Remove existing table
    d3.selectAll("tr").remove();

    var theader = ["Year", "Title", "Director", "Actors", "IMDB", "Rating", "Plot"]
    var header = thead.append("tr")
    theader.forEach(function(att) {
        header.append("td").text(att);
    });

    if (specifiedInputs.length > 1) {
        var table = tabler(filtered);
    }
    else {
        var table = tabler(currentArray);
    }
    
};

// Create event handlers
button.on("click",handle);
submit.on("submit",handle);
