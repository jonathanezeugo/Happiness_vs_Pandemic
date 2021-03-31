// Step 1 Populate Drop Down
// Function to Collect names of countries names to Section tag with options using id selDataset 
//--------------------------------------------
//--------------------------------------------
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

    });
}
// Step 2 Define option changed
//--------------------------------------------
//--------------------------------------------
// Function to change data each time to update charts
function optionChanged(country) {
    // Fetch new data each time a new sample is selected
    // buildCharts(country);
    demographicInfo(country);
}
init();

// Step 3 Demographic
//--------------------------------------------
//--------------------------------------------
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
//--------------------------------------------
//--------------------------------------------
//--find in bubbleapp.js----------------------

// Step 5 map
//--------------------------------------------
//--------------------------------------------
d3.json("/happiness_vs_covid").then((happinessDataSample) => {

    
    function happyMarkerSize(happiness_score) {
        return happiness_score * 5000;
    }

    function deathMarkerSize(sumOfNewDeaths) {
        return sumOfNewDeaths * 50;
    }

    let streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia3A3Mi1oZWxsbyIsImEiOiJja203eDNtbjkwZGZ0MnVxZm1yOGRlYnJzIn0.fGY0KKU9o44jdyhZtdCbog'
    });


    // Create two separate layer groups for death and happiness score
    var deaths = L.layerGroup();
    var score = L.layerGroup();

    //overlay object
    let overlayMaps = {
        "No of Deaths": deaths,
        "Happiness Score": score
    };

    //Base map object
    let baseMaps = {
        "Grey Layer": streetmap
    };

    //Create the map
    let myMap = L.map("map", {
        center: [40.573883587770304, -3.873485396773201],
        zoom: 2.5,
        layers: [streetmap, score, deaths] 
    });


    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    for (var i = 0; i < happinessDataSample.length; i++) {
            
            var happinessRating = parseFloat((happinessDataSample[i]['happiness_score'])).toFixed(2)
            console.log(happinessRating);
            console.log(happinessDataSample[i].latitude);
            
            L.circle([happinessDataSample[i].latitude, happinessDataSample[i].longitude], {
                stroke: true,
                color: "green",
                weight: 3,
                innerfill: true,
                radius: happyMarkerSize((happinessRating)*10)
            // }).bindPopup(`<h1> ${happinessDataSample[i].latitude}, ${happinessDataSample[i].longitude}</h1><br>
            // <h1> Happiness Score: ${happinessRating}</h1>`)
            // .addTo(score)
            }).bindPopup(`<h1> </h1><br>
            <h1> Happiness Score: ${happinessRating}</h1>`)
            .addTo(score)
        }

    for (var i = 0; i < happinessDataSample.length; i++) {
        
        var numDeaths = Math.round(happinessDataSample[i]['total_new_deaths'])

        L.circle([happinessDataSample[i].latitude, happinessDataSample[i].longitude], {
            stroke: true,
            color: "black",
            height: 50,
            weight: 0,
            radius: deathMarkerSize((numDeaths)/3.5)
        }).bindPopup(`<h1> ${happinessDataSample[i].country}</h1><br>
        <h1> Number of Deaths: ${numDeaths}</h1>`)
        .addTo(deaths)
        }

});