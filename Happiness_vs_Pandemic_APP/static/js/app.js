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
function bubble
// Step 5 map
let happinessDataSample = [
    {
        country: 'Afghanistan',
        happiness_score: 2.566900015,
        sumOfNewDeaths: 2191,
        coordinates: [35.10225441266121, 69.10099900210726]
    },
    {
        country: 'Albania',
        happiness_score: 4.882699966,
        sumOfNewDeaths: 1181,
        coordinates: [41.05791255912508, 19.684294085443938]
    },
    {
        country: 'Algeria',
        happiness_score: 5.005099773,
        sumOfNewDeaths: 2756,
        coordinates: [28.188282840972988, 2.848601585355328]
    },
    {
        country: 'Argentina',
        happiness_score: 5.974699974,
        sumOfNewDeaths: 43245,
        coordinates: [-34.99973980922166, -65.25313441339156]
    },
    {
        country: 'Armenia',
        happiness_score: 4.676799774,
        sumOfNewDeaths: 2823,
        coordinates: [40.312799644893964, 44.6557487723505]
    },
    {
        country: 'Australia',
        happiness_score: 7.222799778,
        sumOfNewDeaths: 909,
        coordinates: [-25.031487740433356, 134.90752952344448]
    }
];

data = createMap(happinessDataSample);

function createMap() {

    function happyMarkerSize(happiness_score) {
        return happiness_score * 50000;
    }

    function deathMarkerSize(sumOfNewDeaths) {
        return sumOfNewDeaths * 50;
    }

    let streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1Ijoia3A3Mi1oZWxsbyIsImEiOiJja203eDNtbjkwZGZ0MnVxZm1yOGRlYnJzIn0.fGY0KKU9o44jdyhZtdCbog"
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
        "Street Layer": streetmap
    };

    //Create the map
    let myMap = L.map("#map", {
        center: [40.573883587770304, -3.873485396773201],
        zoom: 3,
        layers: [streetmap, score, deaths] 
    });


    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    for (var i = 0; i < happinessDataSample.length; i++) {
            var coordinates = happinessDataSample[i]['coordinates']
            var happinessRating = happinessDataSample[i]['happiness_score']
            var coData = []
            coData.push(L.circle([happinessDataSample[i].coordinates[0], happinessDataSample[i].coordinates[1]], {
                stroke: true,
                color: "red",
                weight: 0,
                radius: happyMarkerSize(happinessRating)
            }).bindPopup(`<h1> ${coordinates}</h1><br>
            <h1> Happiness Score: ${happinessRating}</h1>`)
            .addTo(score))
        }

    for (var i = 0; i < happinessDataSample.length; i++) {
        var coordinates = happinessDataSample[i]['coordinates']
        var numDeaths = happinessDataSample[i]['sumOfNewDeaths']
        var covData = []
        covData.push(L.circle([happinessDataSample[i].coordinates[0], happinessDataSample[i].coordinates[1]], {
            stroke: true,
            color: "black",
            weight: 0,
            radius: deathMarkerSize(numDeaths)
        }).bindPopup(`<h1> ${coordinates}</h1><br>
        <h1> Number of Deaths: ${numDeaths}</h1>`)
        .addTo(deaths))
        }

};