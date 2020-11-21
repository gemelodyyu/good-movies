d3.json("/api").then(data => {
    console.log(data)
    console.log(data[0].genres)
    
    data.forEach(function(d) {
        var genres = d.genres
        // console.log(genres.length)
        // console.log(genres.slice(0,genres.length))
        genres = genres.slice(0,genres.length)
        console.log(genres.split())
        // for (var i=0; i<d.length; i++){
        //     console.log(genres)
        // }
        // genres.forEach(function(f) {
        //     console.log(g.name)})
    })
})
