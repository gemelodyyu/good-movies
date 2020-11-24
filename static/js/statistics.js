// read data
d3.json("/api/statistics").then((importData) => {
    console.debug(importData);
    var tableData = importData;

    // // setting up bar chart
    // var sortedbyRevenue = data.sort((a, b) => b.revenue - a.revenue);

    // // Slice the first 10 objects for plotting
    // slicedData = sortedbyRevenue.slice(0, 10)

    // // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();
    // console.log(reversedData);

    // // Trace1 for the  Data
    // var trace1 = {
    //     x: reversedData.map(object => object.revenue),
    //     y: reversedData.map(object => object.title),
    //     //   text: reversedData.map(object => object.title),
    //     name: "Movie",
    //     type: "bar",
    //     orientation: "h"
    // };
    // // data
    // var data = [trace1];
    // // Apply the group bar mode to the layout
    // var layout = {
    //     title: "Top 10 Movies Based on Revenue",
    //     xaxis: { title: "Revenue" },
    //     yaxis: { title: "Title" },
    //     margin: {
    //         l: 500,
    //         r: 200,
    //         t: 200,
    //         b: 200
    //     }
    // };
    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("plot", data, layout);

    // ---------------------
    
    var years =[];
    // Set up Drop down box:
    var dropDown = d3.selectAll("#selDataset")
    tableData.forEach(data => {

        var year = parseInt(data.release_date.split("-")[0]);
        // console.log(year);
        // console.log(!years.includes(year));
        if (!years.includes(year)) {
            years.push(year);
        };        
    });
    var finalYears = years.sort((a, b) => a - b);
    // console.log(finalYears);
    finalYears.forEach (year => {
        var item = dropDown.append("option");
        item.text(year);
    })

    dropDown.on("change", runFilter);

    var dateSelect = d3.select("#selDataset")
    dateSelect.on("change", runFilter);

    function runFilter() {
        d3.event.preventDefault();

        var selectedDate = dateSelect.property("value")

        // Demo data:
        console.log(selectedDate)
        var demoData = []
        var demoData = tableData.filter(d => d.release_date.split('-')[0] == selectedDate)
        var filteredRevenue = demoData.acceding();

        var demoInfo = d3.select("#sample-metadata")
        var demoEntries = filteredRevenue[0]
        console.log(demoEntries)

        // demoEntries.html("");
        d3.select("tbody").remove();
        var demoTable = d3.select("table").append("tbody")
        var titleRow = demoTable.append("tr")
        titleRow.append("td").text("Title: ")
        titleRow.append("td").text(demoEntries.title)
        var releaseRow = demoTable.append("tr")
        releaseRow.append("td").text("Release Date: ")
        releaseRow.append("td").text(demoEntries.release_date)
        var budgetRow = demoTable.append("tr")
        budgetRow.append("td").text("Budget: ")
        budgetRow.append("td").text(demoEntries.budget)
        var revenueRow = demoTable.append("tr")
        revenueRow.append("td").text("Revenue: ")
        revenueRow.append("td").text(demoEntries.revenue)
        var ratingRow = demoTable.append("tr")
        ratingRow.append("td").text("Rating: ")
        ratingRow.append("td").text(demoEntries.ratings)
        var oscarRow = demoTable.append("tr")
        oscarRow.append("td").text("Oscar Nomination: ")
        oscarRow.append("td").text(demoEntries.oscar_nominations)
        //Populate Demographic Info
        // Object.entries(demoEntries).forEach(function ([key, value]) {
        //     var superData = d3.select("tbody").append('tr').append('td')
        //     superData.text(`${key[0]}: ${value[0]}`)

        // })
    }
});

