import * as d3 from "d3";

export class D3BarChart {
  constructor(data: { amount: number; }[], parent: HTMLElement) {
    const svg = d3.select(parent).append('svg')
      .classed('chart', true)
      .attr('width', 200)
      .attr('height', 50);

    // Add rectangle
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', 'blue')
      .attr('width', (d) => d.amount)
      .attr('height', 10)
      .attr('y', (d, index) => index * 15)
      .attr('x', 0);
  }
}


export class D3Chart1 {
  constructor() {
    const margin = {top: 30, right: 10, bottom: 10, left: 0};
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#dataviz")
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
    
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then( function(data) {
      
    const dimensions = Object.keys(data[0]).filter(function(d) { return d != "Species" });
    const y: Record<number, d3.ScaleLinear<number, number>> = {}

    for (const [key, dimension] of dimensions.entries()) {
        const scale = d3.scaleLinear().domain(dimension).range([height, 0])
        y[key] = scale
    }

      var x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);
    
      function path(d:any) {
          return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
      }
    
      // Draw the lines
      svg
        .selectAll("myPath")
        .data(data)
        .join("path")
        .attr("d",  path)
        .style("fill", "none")
        .style("stroke", "#69b3a2")
        .style("opacity", 0.5)
    
      // Draw the axis:
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { d3.select(this).call(d3.axisLeft(x).scale(y[d])); })
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -9)
          .text(function(d) { return d; })
          .style("fill", "black")
    
    }) 
  }
}

