import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkComponent } from './atomic-design/atoms/link/link.component';
import { NavComponent } from './atomic-design/molecules/nav/nav.component';
import { HeaderComponent } from './atomic-design/molecules/header/header.component';
import { ImageComponent } from './atomic-design/atoms/image/image.component';
import { TemplateComponent } from './atomic-design/template/template.component';
import { ButtonComponent } from './atomic-design/atoms/button/button.component';
import { HomeComponent } from './atomic-design/pages/home/home.component';
import { TabsNavComponent } from './atomic-design/molecules/tabs-nav/tabs-nav.component';
import { LibraryComponent } from './atomic-design/pages/library/library.component';
import { ContentTechnologyComponent } from './atomic-design/organisms/content-technology/content-technology.component';
import { ContentCapacityComponent } from './atomic-design/organisms/content-capacity/content-capacity.component';
import { FormComponent } from './atomic-design/organisms/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {TechnologyGateway} from "./domain/gateway/technology-gateway";
import {TechnologyApiService} from "./infraestructure/driven-adapter/technology-api/technology-api.service";

@NgModule({
  declarations: [
    AppComponent,
    LinkComponent,
    NavComponent,
    HeaderComponent,
    ImageComponent,
    TemplateComponent,
    ButtonComponent,
    HomeComponent,
    TabsNavComponent,
    LibraryComponent,
    ContentTechnologyComponent,
    ContentCapacityComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: TechnologyGateway, useClass: TechnologyApiService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
