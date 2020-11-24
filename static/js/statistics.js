// read data
d3.json("/api/statistics").then((importData) => {
    console.debug(importData);
    var tableData = importData;

    // Set up Drop down box:
    // get all the years and add them as options in the dropdown menu
    var years = [];
    var dropDown = d3.selectAll("#selDataset")
    tableData.forEach(data => {
        var year = parseInt(data.release_date.split("-")[0]);
        // console.log(year);
        // console.log(!years.includes(year));
        if (!years.includes(year)) {
            years.push(year);
        };
    });
    var finalYears = years.sort((a, b) => b - a);
    // console.log(finalYears);
    finalYears.forEach(year => {
        var item = dropDown.append("option");
        item.text(year);
    })

    dropDown.on("change", runFilter);


    // select handle when change dropdown menu
    var dateSelect = d3.select("#selDataset")
    dateSelect.on("change", runFilter);

    function runFilter() {
        d3.event.preventDefault();

        var selectedDate = dateSelect.property("value")
        console.log(selectedDate)


        // Bar chart
        // filter dataset by year and sort selected year's movies by revenue 
        var demoData = []
        var demoData = tableData.filter(d => d.release_date.split('-')[0] == selectedDate)
        var sortedRevenue = demoData.slice().sort((a, b) => d3.descending(a.revenue, b.revenue));
        console.log(sortedRevenue); 

        // Slice the first 10 objects for plotting
        slicedData = sortedRevenue.slice(0, 10)

        // Reverse the array to accommodate Plotly's defaults
        reversedData = slicedData.reverse();
        console.log(reversedData);

        // Trace1 for the  Data
        var trace1 = {
            x: reversedData.map(object => object.revenue),
            y: reversedData.map(object => object.title),
            //   text: reversedData.map(object => object.title),
            name: "Movie",
            type: "bar",
            orientation: "h"
        };
        // data
        var barData = [trace1];
        // Apply the group bar mode to the layout
        var barLayout = {
            title: "Top 10 Movies Based on Revenue",
            xaxis: { title: "Revenue" },
            yaxis: { title: "Title" },
            margin: {
                l: 300,
                r: 80,
                t: 80,
                b: 80
            }
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot", barData, barLayout);

        // Most Profitable Table: 
        // get information of the most profitable movie of that year and show metadata in table 
        var demoInfo = d3.select("#sample-metadata")
        var demoEntries = sortedRevenue[0]
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
        // var oscarRow = demoTable.append("tr")
        // oscarRow.append("td").text("Oscar Nomination: ")
        // oscarRow.append("td").text(demoEntries.oscar_nominations)
        //Populate Demographic Info
        // Object.entries(demoEntries).forEach(function ([key, value]) {
        //     var superData = d3.select("tbody").append('tr').append('td')
        //     superData.text(`${key[0]}: ${value[0]}`)

        // })

        // Bubble chart: revenue, budget, rating
        var allRevenue = demoData.map(object => object.revenue);
        var allBudget = demoData.map(object => object.budget);
        var allRating = demoData.map(object => object.ratings);
        var allTitle = demoData.map(object => object.title);
        console.log(allRevenue)

        var trace2 = {
			x: allRevenue,
			y: allBudget,
			mode: 'markers',
			marker: {
                size: 10,
                
				color: allRating,
                colorscale: "Portland",
                showscale: true
			},
			text: allTitle
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
            title: {text: "Budget vs. Revenue"}, 
            xaxis: {title: "Revenue"},
            yaxis: {title: "Budget"},
            // height: 600,
            // width: 600,
			
		};
		
		Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    }
});

