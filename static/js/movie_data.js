d3.json("/api/data").then(movieData => {
    console.log(movieData)
    // // from data.js
    // var tableData = data;

    // Find html tags/selectors
    var thead = d3.select("thead");
    var tbody = d3.select("tbody");
    var button = d3.select("#filter-btn");
    var submit = d3.select("#searchForm");
    var reset = d3.select("#reset-btn");


    // Define function that appends values from key,value pairs in each "data" object 
    // entry to a table
    function tabler(data) {
        data.forEach(function (movie) {
            var row = tbody.append("tr");
            Object.entries(movie).forEach(function ([key, value]) {
                row.append("td").text(value);
            });
        });
    };

    // Create unfiltered table
    tabler(movieData);

    // console.log(movieData[0])

    // Define filter function
    function filterer(data, att, value) {
        var filteredArray = data.filter(function (data) {
            if (att == "release_date") {
                return data[att].split('-')[0] == value.trim();
            } 
            return data[att].toLowerCase().trim() === value.toLowerCase().trim();
        });
        return filteredArray;
    }

    // Define function to make table for filtered date
    function handle() {
        d3.event.preventDefault();

        var yearInput = d3.select("#Year").property("value");
        var genresInput = d3.select("#Genres").property("value");
        var titleInput = d3.select("#Title").property("value");
        var directorInput = d3.select("#Director").property("value");
        var actorInput = d3.select("#Actors").property("value");
        // var imdbInput = d3.select("#IMDB").property("value");

        var inputs = [yearInput, genresInput, titleInput, directorInput, actorInput];
        var atts = ["release_date", "genres", "title", "movie_crew", "movie_cast"];
        var specifiedInputs = [];
        var specifiedAtts = [];

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] != "") {
                specifiedInputs.push(inputs[i]);
                specifiedAtts.push(atts[i]);
            };
        };

        var currentArray = filterer(movieData, specifiedAtts[0], specifiedInputs[0]);

        for (var i = 1; i < specifiedInputs.length; i++) {
            var filtered = filterer(currentArray, specifiedAtts[i], specifiedInputs[i]);
            currentArray = filtered;
        };

        // Remove existing table
        d3.selectAll("tr").remove();

        var theader = ["Title", "Genres", "Release Date", "Crew", "Cast", "Overview", "Rating"]
        var header = thead.append("tr")
        theader.forEach(function (att) {
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
    button.on("click", handle);
    submit.on("submit", handle);
})