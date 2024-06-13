import { NgModule } from '@angular/core';
import { RouterModule, Routes } from  '@angular/router';
import { HomeComponent } from './atomic-design/pages/home/home.component';
import { LibraryComponent } from './atomic-design/pages/library/library.component';
import { ContentTechnologyComponent } from './atomic-design/pages/technology/technology.component';
import { ContentCapacityComponent } from './atomic-design/pages/capacity/capacity.component';
import { BootcampComponent } from './atomic-design/pages/bootcamp/bootcamp.component';
import { LoginComponent } from './atomic-design/pages/login/login.component';
import { DashboarComponent } from './atomic-design/pages/dashboar/dashboar/dashboar.component';
import { PermissionsGuard } from './shared/guards/permissions.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboarComponent,canActivate: [PermissionsGuard], data: {rolesExpected: ['STUDENT', 'TUTOR', 'ADMIN']},
   children: [
    {path: 'home', component: HomeComponent },
    {path: 'library', component: LibraryComponent, canActivate: [PermissionsGuard], data: {rolesExpected: ['ADMIN']},
    children: [
      {path: 'technology', component: ContentTechnologyComponent },
      {path: 'capacity', component: ContentCapacityComponent },
      {path: 'bootcamp', component: BootcampComponent },
      {path: '', redirectTo: 'technology', pathMatch: 'full' }
    ]},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
