d3.json("/api/data").then(data => {
    console.log(data)
    
    data.forEach(function(d) {
        // var genres = d.genres
        // genres = genres.replaceAll("'","\"")
        // genres = JSON.parse(genres)

        // Parse genres as JSON
        d.genres = d.genres.replaceAll("'","\"")
        d.genres = JSON.parse(d.genres)

        // Parse movie cast as JSON
        d.movie_cast = d.movie_cast.replaceAll("'","\"").replaceAll('None','"None"')
        try {
            d.movie_cast = JSON.parse(d.movie_cast)   
        } catch {}

        // var directors = d.movie_crew.split(",",6)
        // directors = directors.slice(5,6)
        // directors = directors[0].replaceAll("'","\"")
        // directors = "{" + directors + "}"
        // directors = JSON.parse(directors)

        // Parse director as JSON via a cheap hack
        d.movie_crew = d.movie_crew.split(",",6)
        d.movie_crew = d.movie_crew.slice(5,6)
        d.movie_crew = d.movie_crew[0].replaceAll("'","\"")
        d.movie_crew = "{" + d.movie_crew + "}"
        d.movie_crew = JSON.parse(d.movie_crew)

    })
})