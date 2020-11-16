
function optionChanged() {
    
}
 

d3.csv("movie_data.csv", function(data){
    console.log(data)
});


let data;

const mySamplesRequest = new Request('samples.json');
fetch(mySamplesRequest)
    .then(response => response.json())
    .then(json => {
        data = json;
        console.log(data);

        let options = '';
        for (name in data.names) {
            options = options + `<option>${data.names[name]}</option>`;
      }  

        document.getElementById('selDataset').innerHTML = options;
        optionChanged(document.getElementById('selDataset').value)
    });

function optionChanged(value) {
    const index = data.names.indexOf(value)
    renderBarChart(data.samples[index]);
    renderBubbleChart(data.samples[index]);
    renderDemographicInfo(data.metadata[index]);
    // renderGuage();
}

function renderBarChart(sample) {
    const trace1 = {
        x: sample.sample_values.slice(0,9).reverse(),
        y: sample.otu_ids.map(id => `Dir's Name: ${id}`).slice(0,9).reverse(),
        hovertext: sample.otu_labels.slice(0,9).reverse(),
        type: 'bar',
        orientation: 'h',
    }

    var layout = {
        title: "Top 10 Grossing Movies by Directors",
        xaxis: {title: "Average Profit"},
        yaxis: {title: "Name of Director"}
    };

    Plotly.newPlot("bar", [trace1], layout)
}

function renderBubbleChart(sample) {
    const trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        text: sample.otu_labels,
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
        }
        
    // ****Why is this layout not working???****
    // var layout = {
    //     title: "Budget vs. Profit",
    //     xaxis: {title: "Budget"},
    //     yaxis: {title: "Profit"}
    // }
    
    }

    Plotly.newPlot("bubble", [trace1]);
}

// **** Use this function to populate the "Movie Info" section ****
// function renderDemographicInfo(metadata) {
//         let metas = '';
//         for (meta in metadata) {
//             metas = metas + `<p>${meta}:${metadata[meta]}</p>`;
//         }
//         document.getElementById('sample-metadata').innerHTML = metas;
// }

// function renderGuage() {
//     console.log('guage');
// }



















// -------------------------------------------
// let data;

// const mySamplesRequest = new Request('samples.json');
// fetch(mySamplesRequest)
//     .then(response => response.json())
//     .then(json => {
//         data = json;
//         console.log(data);

//         let options = '';
//         for (name in data.names) {
//             options = options + `<option>${data.names[name]}</option>`;
//       }  

//         document.getElementById('selDataset').innerHTML = options;
//         optionChanged(document.getElementById('selDataset').value)
//     });

// function optionChanged(value) {
//     const index = data.names.indexOf(value)
//     renderBarChart(data.samples[index]);
//     renderBubbleChart(data.samples[index]);
//     renderDemographicInfo(data.metadata[index]);
//     renderGuage();
// }

// function renderBarChart(sample) {
//     const trace1 = {
//         x: sample.sample_values.slice(0,9).reverse(),
//         y: sample.otu_ids.map(id => `OTU ${id}`).slice(0,9).reverse(),
//         hovertext: sample.otu_labels.slice(0,9).reverse(),
//         type: 'bar',
//         orientation: 'h',
//     }

//     Plotly.newPlot("bar", [trace1],)
// }

// function renderBubbleChart(sample) {
//     const trace1 = {
//         x: sample.otu_ids,
//         y: sample.sample_values,
//         mode: 'markers',
//         text: sample.otu_labels,
//         marker: {
//             size: sample.sample_values,
//             color: sample.otu_ids,
//         }
//     }

//     Plotly.newPlot("bubble", [trace1],);
// }

// function renderDemographicInfo(metadata) {
//         let metas = '';
//         for (meta in metadata) {
//             metas = metas + `<p>${meta}:${metadata[meta]}</p>`;
//         }
//         document.getElementById('sample-metadata').innerHTML = metas;
// }

// function renderGuage() {
//     console.log('guage');
// }