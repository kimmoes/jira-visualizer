import {Component, OnInit, EventEmitter} from '@angular/core';
import { scaleLinear } from "d3-scale";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

public searchTerm: String = "";
public emitter: EventEmitter<String> = new EventEmitter();

  constructor() { }

  search(): void {
    this.emitter.emit(this.searchTerm);
  }

}
