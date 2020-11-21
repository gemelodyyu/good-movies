d3.json("/api/data").then(data => {
    console.log(data)
    data.forEach(function(d) {
        console.log(d.genres)
    })
})