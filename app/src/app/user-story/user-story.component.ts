import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoryService } from '../common/service/user-story.service';
import { Issue } from '../common/model/issue.interface';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit {

  public userStory: Issue;

  constructor(private userStoryService: UserStoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getIssue(params['id']);
    });
    const userStoryId = 'IU-203';
  }

  getIssue(id: string) {
    this.userStoryService.getIssue(id).subscribe(
      res => this.userStory = res
    );
  }

}
