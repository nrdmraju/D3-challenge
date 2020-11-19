// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;    
    var margin = {
        top:60,
        right:60,
        bottom:60,
        left:50
    };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height",svgHeight + 30);

    var chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        d3.csv("assets/data/data.csv").then(function(stateData) {
        stateData.forEach(function(data) {
            data.healthcare = + data.healthcare;
            data.poverty = + data.poverty;
    });
    var xLinear = d3.scaleLinear()
        .domain([8.5, d3.max(stateData, d => d.poverty)])
        .range([0,width]);
    var yLinear = d3.scaleLinear()
        .domain([4.5, d3.max(stateData, d => d.healthcare)]) 
        .range([height,0]);
    var bottomAx = d3.axisBottom(xLinear).ticks(8);
    var leftAx = d3.axisLeft(yLinear);

    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
            .call(bottomAx);
    chart.append("g")
        .call(leftAx);

    var circle = chart.selectAll("circle")
        .data(stateData)
            .enter()
        .append("circle")
            .attr("cx", d => xLinear(d.poverty))
            .attr("cy", d => yLinear(d.healthcare))
            .attr("r", "12")
                .classed("stateCircle", true)

    chart.selectAll()
        .data(stateData)
            .enter()
        .append("text")
            .attr("x", d => xLinear(d.poverty))
            .attr("y", d => yLinear(d.healthcare))
        .text(n => n.abbr)
            .classed("stateText", true)
                .attr("font-size", "10px")

    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height/1))
        .attr("dy", "1em")
        .attr("class", "axisText")
            .text("% Of Population Lacking Healthcare")
    chart.append("text")
        .attr("transform", `translate(${width/3}, ${height+35})`)
        .attr("class","axisText")
            .text(" % Of Population In Poverty")

    }).catch(function(error){
        console.log(error);
        });