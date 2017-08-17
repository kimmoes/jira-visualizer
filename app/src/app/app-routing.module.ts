import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { UserStoryComponent } from './user-story/user-story.component';

const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'user-story/:id', component: UserStoryComponent },
    { path: '**', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
