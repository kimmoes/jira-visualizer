import { Component, OnInit } from '@angular/core';
import { scaleLinear } from "d3-scale";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

public searchTerm: String = "";

  constructor() { }

  search(): void {
    console.log(this.searchTerm);
  }

}
