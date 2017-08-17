import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserStoryComponent } from './user-story/user-story.component';
import { SearchComponent } from './search/search.component';
import { Issue } from './common/model/issue.interface';
import { Credentials } from './common/config/credentials';
import { Properties } from './common/config/properties';

import { UserStoryService } from './common/service/user-story.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UserStoryComponent,
    SearchComponent
  ],
  providers: [UserStoryService, Credentials, Properties],
  bootstrap: [AppComponent]
})
export class AppModule { }
