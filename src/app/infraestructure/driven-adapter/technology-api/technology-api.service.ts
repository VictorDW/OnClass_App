import { Injectable } from '@angular/core';
import {TechnologyGateway} from "../../../domain/gateway/technology-gateway";
import {Technology} from "../../../domain/models/technology";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Endpoints, environment} from "../../../../environments/environment";

@Injectable()
export class TechnologyApiService implements TechnologyGateway {

  private _url = environment.BASE_URL + Endpoints.TECHNOLOGY;
  constructor(private httpClient: HttpClient) { }

  registerTechnology(technology: Technology): Observable<void> {
    return this.httpClient.post<void>(this._url, technology);
  }

  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this._url);
  }
}
