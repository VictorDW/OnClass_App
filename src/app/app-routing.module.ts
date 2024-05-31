import { NgModule } from '@angular/core';
import { RouterModule, Routes } from  '@angular/router';
import { HomeComponent } from './atomic-design/pages/home/home.component';
import { LibraryComponent } from './atomic-design/pages/library/library.component';
import { ContentTechnologyComponent } from './atomic-design/pages/technology/technology.component';
import { ContentCapacityComponent } from './atomic-design/pages/capacity/capacity.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'library', component: LibraryComponent, children: [
    {path: 'technology', component: ContentTechnologyComponent },
    {path: 'capacity', component: ContentCapacityComponent },
    { path: '', redirectTo: 'technology', pathMatch: 'full' }
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
