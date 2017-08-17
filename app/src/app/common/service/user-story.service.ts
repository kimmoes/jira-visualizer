import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from '../model/issue.interface';
import { Credentials } from '../config/credentials';

@Injectable()
export class UserStoryService {

  constructor(private http: HttpClient, private auth: Credentials) { }

  getIssue(id: string): Observable<Issue> {
    const url = `https://iciskm.atlassian.net/rest/api/latest/issue/${id}?fields=navigble,summary,issuelinks`;
    const auth = this.getAuthHeaders();
    return this.http.get<Issue>(url, {
      headers: auth
    }).map(
      res => res
      ).catch(
      error => Observable.throw(error)
      );
  }

  private getAuthHeaders(): HttpHeaders {
    const b64 = btoa(this.auth.username + ':' + this.auth.password);
    return new HttpHeaders().set('Authorization', 'Basic ' + b64);
  }

}
