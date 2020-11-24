d3.json("/api/data").then(movieData => {
    // // from data.js
    // var tableData = data;

    // Clean data 
    movieData.forEach(function(d) {
    // Parse genres as JSON
        d.genres = d.genres.replaceAll("'","\"")
        d.genres = JSON.parse(d.genres)

        // Parse movie cast as JSON
        d.movie_cast = d.movie_cast.replaceAll("'","\"").replaceAll('None','"None"')
        try {
            d.movie_cast = JSON.parse(d.movie_cast)   
        } catch {d.movie_cast = "Data Not Available"}

        // Parse director as JSON via a cheap hack
        d.movie_crew = d.movie_crew.split(",",6)
        d.movie_crew = d.movie_crew.slice(5,6)
        d.movie_crew = d.movie_crew[0].replaceAll("'","\"")
        d.movie_crew = "{" + d.movie_crew + "}"
        try {
            d.movie_crew = JSON.parse(d.movie_crew)
        } catch {d.movie_crew = "Data Not Available"}
    })
    console.log(movieData)

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
            var title = movie.title;
            genres = []
            for (var i=0; i<movie.genres.length; i++) {
                genres.push(movie.genres[i].name);
            }
            var date = movie.release_date;
            var director = movie.movie_crew.name;
            var cast = []
            for (var i=0; i<movie.movie_cast.length; i++) {
                if (movie.movie_cast != "Data Not Available") {
                    cast.push(movie.movie_cast[i].name)
                }
                else {
                    cast = "Data Not Available"
                }
            }
            var overview = movie.overview;
            var rating = movie.rating;

            var row = tbody.append("tr");
            row.append("td").text(title);
            row.append("td").text(genres);
            row.append("td").text(date);
            row.append("td").text(director);
            row.append("td").text(cast);
            row.append("td").text(overview);
            row.append("td").text(rating);

        });
    };

    // Create unfiltered table
    tabler(movieData);

    // console.log(movieData[0])

    // Define filter function
    // Filter function requires true/false criteria to be defined and rows that return "true" are
    // added to filteredArray
    function filterer(data, att, value) {
        var filteredArray = data.filter(function (d) {
            if (att == "release_date") {
                return d[att].split('-')[0] == value.trim();
            } 
            if (att == "movie_crew") {
                return d[att].name.toLowerCase().trim() === value.toLowerCase().trim();
            }
            // TO FIX: Return rows containing value in list of genres
            if (att=="genres") {
                // movieData.forEach(function (movie) {
                var genres = []
                //     for (var i=0; i<movie.genres.length; i++) {
                //         // genres.push(movie.genres[i].name)
                //         var temp_genres = movie.genres[i].name.split(",")
                //         temp_genres.forEach(g => genres.push(g))
                //     }
                //     console.log(genres)
                //     console.log(genres.includes(value))
                //     if (genres.includes(value)) {
                //         // console.log(d[att])
                //         // return d[att]
                //     }
                // })       
                for (genre of d.genres) {
                    genres.push(genre.name)
                }
                // console.log(genres)
                return genres.includes(value)
            }
            if (att == "movie_cast") {
                var actors = []
                for (actor of d.movie_cast) {
                    actors.push(actor.name)
                }
                return actors.includes(value)
            }

            if (att == "title") {
                return d[att].toLowerCase().trim() == value.toLowerCase().trim();
            }
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

        var theader = ["Title", "Genres", "Release Date", "Director", "Cast", "Overview", "Rating"]
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