d3.json("/api").then(data => {
    console.log(data)
    
    data.forEach(function(d) {
        var genres = array(d.genres)
        console.log(genres)
        // for (var i=0; i<genres.length; i++){
        //     console.log(genres.name)
        // }
        // genres.forEach(function(f) {
        //     console.log(g.name)})
    })
})
