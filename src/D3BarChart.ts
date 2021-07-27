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


export class D3Chart1 {
  value!: string;
  constructor(parent: HTMLElement) {
    const svg = select(parent).append('svg')
       .classed('chart1', true)

    // Show circle with initial radius of 60px
     const circle = svg.append('circle')
         .attr('cx', 100)
         .attr('cy', 100) 
         .attr('fill', 'none')   
         .attr('stroke', 'blue') 
         .attr('r', 30);
      
     function update(radius:number) {
         circle.attr('r', radius);
     }
     const circumference = document.getElementById('radius-slider') as HTMLInputElement;
     // Event slider for input slider
     select(circumference).on('input', function()  {
       
         // Update visualization
         update(parseInt(this.value));
         // Update label
         select('#radius-value').text(this.value);
     });
  }
}
