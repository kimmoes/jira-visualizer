import {Component, OnInit, Input, OnChanges, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStoryService} from '../common/service/user-story.service';
import {Issue} from '../common/model/issue.interface';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit, OnChanges {

  public userStory: Issue;

  @Input() id: EventEmitter<string>;

  ngOnChanges() {
    console.log('this.numberOfChanges..:' + this.id);
  }

  constructor(private userStoryService: UserStoryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id.subscribe(
      id => this.getIssue(id)
    );
    console.log('Hello - start');
  }

  getIssue(id: string) {
    console.log('Hello');
    this.userStoryService.getIssue(id).subscribe(
      res => this.userStory = res
    );
  }

}
