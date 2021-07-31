import * as d3 from "d3";

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