import { Injectable } from '@angular/core';
import { CapacityGateway } from '../../../domain/gateway/capacity-gateway';
import { Observable } from 'rxjs';
import { KeyEnum, Pagination } from 'src/app/domain/interface/pagination';
import { Capacity } from 'src/app/domain/models/capacity';
import { Page } from 'src/app/shared/service/interface/Page';
import { Endpoints, environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CapacityApiService implements CapacityGateway {

  private _url = environment.BASE_URL + Endpoints.CAPACITY;

  constructor(private _httpClient: HttpClient) { }

  registerCapacity(capacity: Capacity): Observable<void> {
    return this._httpClient.post<void>(this._url, capacity);
  }
  getCapacities(pagination: Pagination): Observable<Page<Capacity>> {
    return this._httpClient.get<Page<Capacity>>(`${this._url}?size=${pagination[KeyEnum.SIZE]}&direction=${pagination[KeyEnum.DIRECTION]}&page=${pagination[KeyEnum.PAGE]}&orderBy=${pagination[KeyEnum.ORDERBY]}`);
  }
}
