import { select } from 'd3-selection';

export class D3BarChart {
  constructor(data: { amount: number; }[], parent: HTMLElement) {
    const svg = select(parent).append('svg')
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
