import { Injectable } from '@angular/core';
import { TechnologyGateway } from "../../../domain/gateway/technology-gateway";
import { Technology, TechnologyBasic } from "../../../domain/models/technology";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Endpoints, environment } from "../../../../environments/environment";
import { Pagination, KeyEnum } from 'src/app/domain/interface/pagination';
import { Page } from 'src/app/shared/service/interface/Page';

@Injectable()
export class TechnologyApiService implements TechnologyGateway {

  private _url = environment.BASE_URL + Endpoints.TECHNOLOGY;
  constructor(private httpClient: HttpClient) { }

  registerTechnology(technology: Technology): Observable<void> {
    return this.httpClient.post<void>(this._url, technology);
  }

  getTechnologies(pagination: Pagination): Observable<Page<Technology>> {
    return this.httpClient.get<Page<Technology>>(`${this._url}?size=${pagination[KeyEnum.SIZE]}&direction=${pagination[KeyEnum.DIRECTION]}&page=${pagination[KeyEnum.PAGE]}`);
  }

  getTechnologiesWithoutPagination(): Observable<TechnologyBasic[]> {
    return this.httpClient.get<TechnologyBasic[]>(`${this._url}/without-pagination`);
  }

  
}
