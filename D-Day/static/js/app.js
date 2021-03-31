// Reading samples.json file with D3 library (Promise)
// const dataSource = d3.json("./data/samples.json");

// Viewing json file in console
// dataSource.then(dataset => {console.log(dataset)});

// Creating multiple functions for horizontal bar chart with dropdown for top 10 OTUs per individual
function makeChart(country){
    d3.json(`http://127.0.0.1:5000/happiness_vs_covid_charts/${country}`).then(data => {
        console.log(data)
        let sampleArr = data.filter(sampleObj => sampleObj.country === country);
        // if (data.country === chosenSample){
            console.log(sampleArr)
            let newCases = []
            sampleArr.forEach(d => newCases.push(d.new_cases))
            // console.log(newCases)
            let newDeaths = []
            sampleArr.forEach(d => newDeaths.push(d.new_deaths))
            // console.log(newDeaths)

            let happScore = []
            sampleArr.forEach(d => happScore.push(d.happiness_score))
            //console.log(happScore)
        // }
        // Horizontal bar chart trace for top 10 OTUs
        let lineTrace = [{
            x: newCases,
            y: newDeaths,
            text: happScore,
            type: 'scatter',
            // orientation: 'h',
            marker: {color:'blue', line: {color: 'black'}}
        }]
        let lineLayout = {
            xaxis: {title: 'New COVID Cases'},
            yaxis: {title: 'New COVID Deaths'},
            title: `Top 10 Cases Data for: ${data[0].country}`, font: {size: 12},
            width: 400,
            height: 650,
        }
        // Plot bar chart
        Plotly.newPlot('bar', lineTrace, lineLayout);

        // Build bubble chart
        let bublTrace = [{
            x: newCases,
            y: newDeaths,
            text: sampleArr.country,
            type: 'scatter',
            mode: 'markers',
            marker: {size: newDeaths, color: happScore}
        }];
        
        let bublLayout = {
            xaxis: {title: 'New Cases'},
            yaxis: {title: 'New Deaths'},
            title: `Happiness Vs Covid New Cases and New Deaths for: ${data[0].country}`,
            hovermode: 'closest',
            height: 600,
            width: 1000
        }
        // Plot bubble chart
        Plotly.newPlot('bubble', bublTrace, bublLayout);

    });
}

// Creating initializing function 
function init(){
    d3.json(`http://127.0.0.1:5000/countries`).then( countries => {
        countries.forEach( country => {
            d3.select('#selDataset')
                .append('option')
                .text(country)
                .property('value', country); 
                console.log(country)  
        })
        
    })
    makeChart(country);
    makeDemoInfo(country);
    optionChanged(country)
};


// function mapping(chosenSample){

// }

// Creating a function for the dropdown options
function makeDemoInfo(country){
    d3.json(`http://127.0.0.1:5000/demographics/${country}`).then(data => {
        // let metaDataInfo = sampMetaData.metadata.filter(sampleObj => sampleObj.id.toString() === chosenSample)[0];

        let Panel = d3.select("#sample-metadata");//.html("");
        console.log(data)
        // resetting
        Panel.html("");
        Object.entries(data[0]).forEach(([key, value]) => {
            // sampleMetadataPanel
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);            
        });
    });
};

// Creating a function to handle options change
function optionChanged(country){
    makeChart(country);
    makeDemoInfo(country);    
};

// Initializing function
init();