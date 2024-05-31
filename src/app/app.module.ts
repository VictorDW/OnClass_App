import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
import { ContentTechnologyComponent } from './atomic-design/pages/technology/technology.component';
import { ContentCapacityComponent } from './atomic-design/organisms/content-capacity/content-capacity.component';
import { FormComponent } from './atomic-design/organisms/form/form.component';
import { TechnologyGateway } from "./domain/gateway/technology-gateway";
import { TechnologyApiService } from "./infraestructure/driven-adapter/technology-api/technology-api.service";
import { TokenInterceptor } from "./shared/token/token.interceptor";
import { AlertComponent } from './atomic-design/atoms/alert/alert/alert.component';
import { ModalComponent } from './atomic-design/molecules/modal/modal.component';
import { ListModelsComponent } from './atomic-design/organisms/list-models/list-models.component';
import { SelectComponent } from './atomic-design/molecules/select/select.component';

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
    FormComponent,
    AlertComponent,
    ModalComponent,
    ListModelsComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: TechnologyGateway, useClass: TechnologyApiService},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
