// Step 1 Populate Drop Down
// Function to Collect names of countries names to Section tag with options using id selDataset 
function init() {
    // Use a list of names from names
    d3.json("/countries").then((data) => {

        // bind - data to well under select with id selDataset
        data.forEach((country)=>{
            d3.select("#selDataset")
                .append("option")
                .text(country)
                .property("value", country); 

        });
        // Use the first sample from the list to build the initial plots
        // have sample1 as a constant variable to keep when initiated
        // const sample1 = sampleNames[0];
        // console.log("sample1",sample1);
        // buildCharts(sample1);
        // buildMetadata(sample1);
    });
}

// Function to change data each time to update charts
function optionChanged(country) {
    // Fetch new data each time a new sample is selected
    // buildCharts(country);
    demographicInfo(country);
}
init();

// Step 2 Define option changed

// Step 3 Demographic
function demographicInfo(country) {
    d3.json(`/demographics/${country}`).then((data) => {
        
        let PANEL = d3.select("#sample-metadata");
        // empty the panel in html before appending key, value pairs
        PANEL.html("");
        Object.entries(data).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h4").text(`${key}: ${value}`);
        });
    });
}
// STep 4 bubble chart

// Step 5 map