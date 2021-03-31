// Create a responsive chart horizontally
function makeResponsive() {
    let svgArea = d3.select("#bubble").select("svg");

    // If there is already an svg container on the page, remove it and reload the chart
    if (!svgArea.empty()) {
        svgArea.remove();
    }
    // let svgWidth = window.innerWidth;
    let svgWidth = 820;
    let svgHeight = 600;

    // let svgWidth = window.innerWidth;
    // let svgHeight = window.innerHeight;

    // Define the chart's margins as an object
    let margin = {
        top: 60,
        right: 60,
        bottom: 80,
        left: 60
    };

    // Define dimensions of the chart area
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;


    //Select id 'scatter', append SVG area to it, and set its dimensions
    let svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append a group area, then set its margins
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial Parameters
    let chosenXAxis = "total_new_cases";
    let yAxis = "happiness_score";

    // Declare scales
    function xScale(inputData, chosenXAxis) {
        // Create scales
        let xLinearScale = d3.scaleLinear()
            .domain([d3.min(inputData, d => d[chosenXAxis]),
            d3.max(inputData, d => d[chosenXAxis]) * 1.2
            ])
            .range([0, width]);

        return xLinearScale;
    }

    // Updating xAxis let upon click on axis label
    function renderXAxes(newXScale, xAxis) {
        let bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    }

    // Updating circles group 
    function renderCircles(circlesGroup, newXScale, chosenXAxis, yScale, yAxis) {

        circlesGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]))
            .attr("cy", function (d) { return yScale(d.happiness_score); })
        
        return circlesGroup;
    } 

     // Load data from data.json
    d3.json("/static/data/data.json").then(function (inputData) {
    //d3.json("/happiness_vs_covid_map").then(function (inputData) {
        // Read the data and cast the values
        inputData.forEach(function (data) {
            data.total_new_cases = data.total_new_cases;
            data.total_new_deaths = data.total_new_deaths;
            data.happiness_score = data.happiness_score*3;
        });

        // xLinearScale function above csv import
        let xLinearScale = xScale(inputData, chosenXAxis);

        // Configure a linear scale with a range between the chartHeight and 0
        let yScale = d3.scaleLinear()
            .domain([0, 40])
            // .domain([0, d3.max(inputData, d => d.total_new_cases)])
            .range([height, 0]);

        let zScale = d3.scaleLinear()
            .domain([419, 28000000])
            .range([5, 7000]);

        // Create two new functions passing the scales in as arguments
        // These will be used to create the chart's axes
        let bottomAxis = d3.axisBottom(xLinearScale);
        let leftAxis = d3.axisLeft(yScale);

        // Append an SVG group element to the chartGroup, create the Y axis inside of it
        let yAxis = chartGroup.append("g")
            .classed("axis", true)
            .call(leftAxis);

        // Append an SVG group element to the chartGroup, create the X axis inside of it
        // Translate the bottom axis to the bottom of the page
        let xAxis = chartGroup.append("g")
                            .classed("axis", true)
                            .attr("transform", `translate(0, ${height})`)
                            .call(bottomAxis);

        // Axis Titles
        // Create groups for the two different x-axis labels
        let xlabelsGroup = chartGroup.append("g")
                            .attr("transform", `translate(${width / 2}, ${height + 60})`)
                            .attr("text-anchor", "middle")
                            .attr("font-size", "20px");   
                
        let totNewCasesLabel = xlabelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 0)
                            .classed("aText", true)
                            .attr("value", "total_new_cases") // value to grab for event listener
                            .classed("active", true)
                            .text("Total New Cases");   
        let totNewDeathsLabel = xlabelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 20)
                            .classed("aText", true)
                            .attr("value", "total_new_deaths") // value to grab for event listener
                            .classed("inactive", true)
                            .text("Total New Deaths");

        let ylabel = chartGroup.append("text")  //y-axis label
                            .attr("y", 0 - 35)
                            .attr("x", 0 - (height / 2))
                            .classed("active", true)
                            .attr("text-anchor", "end")
                            .attr("font-size", "20px")
                            .attr("transform", "rotate(-90)")
                            .text("Happiness Score");

        // Add circles for total deaths data
        let circlesGroup = chartGroup.selectAll("circle")
                            .data(inputData)
                            .enter()
                            .append("circle")
                            .attr("cx", function (d) { return xLinearScale(d.total_new_cases); })
                            .attr("cy", function (d) { return yScale(d.happiness_score); })
                            .attr("r", function (d) { return zScale(d.total_new_deaths); })
                            .style("fill", "cyan")
                            .style("opacity", "0.75")
                            .attr("stroke", "black");

        // Tooltip function
        let toolTip = d3
                .tip()
                .attr("class", "d3-tip")
                .offset([40, 120])
                .html(function (d) {
                    return d;
                })
        
        svg.call(toolTip);

        // x axis labels event listener
        xlabelsGroup.selectAll("text")
            .on("click", function () {
                // get value of selection
                let value = d3.select(this).attr("value");
                if (value != chosenXAxis) {

                    // replaces chosenXAxis with value
                    chosenXAxis = value;

                    // console.log(chosenXAxis)

                    // Updates x scale for new data
                    xLinearScale = xScale(inputData, chosenXAxis);

                    // Updates x axis with transition
                    xAxis = renderXAxes(xLinearScale, xAxis);

                    // Updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yScale, yAxis);

                    // Changes classes to change bold text
                    if (chosenXAxis === "total_new_cases") {
                        totNewCasesLabel.classed("active", true).classed("inactive", false);
                        totNewDeathsLabel.classed("active", false).classed("inactive", true);
                    }
                    else {
                        totNewCasesLabel.classed("active", false).classed("inactive", true);
                        totNewDeathsLabel.classed("active", true).classed("inactive", false);
                    }
                }
            });

        // Add an on.mouseover event to display a tooltip and transition color when selected
        circlesGroup.on("mouseover", function (event, d) {
            toolTip.show(`<strong>Country : ${event.country}</strong><br>
                        <strong>Happiness Score : ${d3.format(',')(event.happiness_score.toFixed())}</strong><br>
                        <strong>Total New Cases : ${d3.format(',')(event.total_new_cases)}</strong><br>
                        <strong>Total New Deaths : ${d3.format(',')(event.total_new_deaths)}</strong>`);
                        
            d3.select(this)
                .transition()
                .duration(300)
                .style("fill", "yellow");

        })

        // Add a on.mouseout event to make the tooltip invisible
        circlesGroup.on("mouseout", function (event, d) {
            toolTip.hide(event.country);
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill", "cyan");
        });
        });
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);