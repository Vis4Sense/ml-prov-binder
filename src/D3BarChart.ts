import * as d3 from "d3";

export class scatterGraph {
  constructor(parent: HTMLElement) {
    var dataset1 = [[90, 20], [20, 100], [66, 44], [53, 80], [24, 182], [80, 72], [10, 76], [33, 150], [100, 15]];
    const margin = {top: 10, right: 30, bottom: 30, left: 30};
    const width = 150
    const height = 150

    const svg = d3.select("#my_dataviz")
    .append("svg")
    .classed('chart1', true)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);
    
    //Creating x label
    svg.append('text')
        .attr('x', width/2 + 100)
        .attr('y', height - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 9)
        .text('Independant');
    
    //Creating y label
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(10,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 9)
        .text('Dependant');
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    
    svg.append("g")
        .call(d3.axisLeft(yScale));
    
    svg.append('g')
        .selectAll("dot")
        .data(dataset1)
        .enter()
        .append("circle")
        .attr("cx", function (d:any) { return xScale(d[0]); } )
        .attr("cy", function (d:any) { return yScale(d[1]); } )
        .attr("r", 2)
        .style("fill", "#CC0000");
  }
}