import { NgModule } from '@angular/core';
import { RouterModule, Routes } from  '@angular/router';
import { HomeComponent } from './atomic-design/pages/home/home.component';
import { LibraryComponent } from './atomic-design/pages/library/library.component';
import { ContentTechnologyComponent } from './atomic-design/pages/technology/technology.component';
import { ContentCapacityComponent } from './atomic-design/pages/capacity/capacity.component';
import { BootcampComponent } from './atomic-design/pages/bootcamp/bootcamp.component';
import { LoginComponent } from './atomic-design/pages/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent },
  {path: 'library', component: LibraryComponent, children: [
    {path: 'technology', component: ContentTechnologyComponent },
    {path: 'capacity', component: ContentCapacityComponent },
    {path: 'bootcamp', component: BootcampComponent },
    {path: '', redirectTo: 'technology', pathMatch: 'full' }
  ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
