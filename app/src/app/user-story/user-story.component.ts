import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoryService } from '../common/service/user-story.service';
import { Issue } from '../common/model/issue.interface';
import * as d3 from 'd3';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit {

  @Input() id: EventEmitter<string>;
  public userStory: Issue;

  private width;
  private height;
  private chartWidth;
  private chartHeight;
  private margin;
  private svg;
  private chartLayer;
  private range;
  private data;


  constructor(private userStoryService: UserStoryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id.subscribe(
      id => this.getIssue(id)
    );
    this.initSvg();
    this.setSize(this.data);
    this.drawChart(this.data);
  }

  private initSvg() {
    this.svg = d3.select('#graph').append('svg');
    this.chartLayer = this.svg.append('g').classed('chartLayer', true);
    this.range = 100;
    this.data = {
      nodes: d3.range(0, this.range).map(d => { return { label: 'l' + d, r: ~~d3.randomUniform(8, 28)() } }),
      links: d3.range(0, this.range).map(() => { return { source: ~~d3.randomUniform(this.range)(), target: ~~d3.randomUniform(this.range)() } })
    };
  }

  private setSize(data) {
    this.width = document.querySelector('#graph').clientWidth
    this.height = document.querySelector('#graph').clientHeight

    this.margin = { top: 0, left: 0, bottom: 0, right: 0 }


    this.chartWidth = this.width - (this.margin.left + this.margin.right)
    this.chartHeight = this.height - (this.margin.top + this.margin.bottom)

    this.svg.attr('width', this.width).attr('height', this.height)


    this.chartLayer
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .attr('transform', 'translate(' + [this.margin.left, this.margin.top] + ')')
  }

  drawChart(data) {
    var simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.index))
      .force('collide', d3.forceCollide((d: any) => d.r + 8).iterations(16))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.chartWidth / 2, this.chartWidth / 2))
      .force('y', d3.forceY(0))
      .force('x', d3.forceX(0))

    var link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', 'black')

    var node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', d => d.r)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));


    var ticked = function () {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    simulation
      .nodes(data.nodes)
      .on('tick', ticked);

    let force: any = simulation.force('link');

    force.links(data.links);

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }






  getIssue(id: string): void {
    console.log('Hello');
    this.userStoryService.getIssue(id).subscribe(
      res => this.userStory = res
    );
  }

}
