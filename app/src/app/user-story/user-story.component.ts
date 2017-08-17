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

  public userStory: Issue;
  public chart;

  @Input() id: EventEmitter<string>;

  constructor(private userStoryService: UserStoryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id.subscribe(
      id => this.getIssue(id)
    );
    this.chart = d3.select("#rect");
    this.draw();
  }

  getIssue(id: string): void {
    console.log('Hello');
    this.userStoryService.getIssue(id).subscribe(
      res => this.userStory = res
    );
  }

  draw() {
    let data = [{ year: 2006, books: 54 },
    { year: 2007, books: 43 },
    { year: 2008, books: 41 },
    { year: 2009, books: 44 },
    { year: 2010, books: 35 }];

    let barWidth = 40;
    let width = (barWidth + 10) * data.length;
    let height = 200;

    let x = d3.scaleLinear().domain([0, data.length]).range([0, width]);
    let y = d3.scaleLinear().domain([0, d3.max(data, function (datum) { return datum.books; })]).
      rangeRound([0, height]);

    this.chart.
      append("svg:svg").
      attr("width", width).
      attr("height", height).
      selectAll("text").
      data(data).
      enter().
      append("svg:text").
      attr("x", function (datum, index) { return x(index) + barWidth; }).
      attr("y", function (datum) { return height - y(datum.books); }).
      attr("dx", -barWidth / 2).
      attr("dy", "1.2em").
      attr("text-anchor", "middle").
      text(function (datum) { return datum.books; }).
      attr("fill", "white");
  }

}
