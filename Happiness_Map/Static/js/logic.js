// var myMap = L.map('map').setView([40.573883587770304, -3.873485396773201], 3);


// let geoData = "data/world_hap.json";

// function markerSize(sumOfNewDeaths) {
//     return sumOfNewDeaths * 50;
// }



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
        accessToken: API_KEY
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
    let myMap = L.map("map", {
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

        // let legend = L.control({ position: 'bottomright' });

        // legend.onAdd = function () {
        //     let div = L.DomUtil.create('div', 'info legend');
        //     div.innerHTML = '<h3> Legend </h3>'
        //     let info = [0,1].
        //     labels - [];
        //     colors = ["#800026","#BD0026"]
        //     for (let i=0; i < happinessSampleData.length; i++) {
        //         div.innerHTML+=`<svg class= "legstyle" style = "background: ${colors[i]}"> </svg> <p> ${info[i]} - ${info[i+1]} </p>`
        //     }
        //     return div;
        // }
        
        // // Adding legend to the map
        // legend.addTo(myMap);
};
