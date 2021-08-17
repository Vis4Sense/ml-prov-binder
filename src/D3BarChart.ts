import * as d3 from 'd3';
export class scatterGraph {
  constructor() {
    const dataset1: any = [];

    // chart size (without axes)
    const width = 150;
    const height = 150;

    const axisLabelXOffset = 5; // gap to bottom svg border
    const axisLabelYOffset = 15; // gap to left svg border

    // margin contains axes (left/bottom) or blank spcae (top/right)
    const margin = {
      // contains axes
      top: 10,
      right: 10, //necessary as x-axis labels may be wider than the chart
      bottom: 30 + axisLabelXOffset,
      left: 30 + axisLabelYOffset
    };

    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .classed('chart1', true)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

    //Creating x label
    svg
      .append('text')
      .attr('x', width / 2 + margin.left) // center in the chart
      .attr('y', height + margin.bottom + margin.top - axisLabelXOffset)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 9)
      .text('Independant');

    //Creating y label
    svg
      .append('text')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', axisLabelYOffset)
      .attr('x', -(height / 2 + margin.top))
      .style('font-family', 'Helvetica')
      .style('font-size', 9)
      .text('Dependant');

    //Plot group, contains axis & marks
    const plot = svg
      .append('g')
      .classed('plot', true)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //Create axes
    plot
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    plot.append('g').call(d3.axisLeft(yScale));

    // Create scatter plot
    plot
      .append('g')
      .selectAll('dot')
      .data(dataset1)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(dataset1))
      .attr('cy', d => yScale(dataset1))
      .attr('r', 2)
      .style('fill', '#CC0000');
  }
}
