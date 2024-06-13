import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BootcampGateway } from 'src/app/domain/gateway/bootcamp-gateway';
import { KeyEnum, Pagination } from 'src/app/domain/interface/pagination';
import { Bootcamp, BootcampResponse } from 'src/app/domain/models/bootcamp';
import { Page } from 'src/app/shared/service/interface/Page';
import { environment, Endpoints } from 'src/environments/environment';

@Injectable()
export class BootcampApiService implements BootcampGateway {

  private _url = environment.BASE_URL + Endpoints.BOOTCAMP;

  constructor(private _httpClient: HttpClient) { }

  registerBootcamp(bootcamp: Bootcamp): Observable<void> {
    return this._httpClient.post<void>(this._url, bootcamp);
  }

  getBootcamps(pagination: Pagination): Observable<Page<BootcampResponse>> {
    return this._httpClient.get<Page<BootcampResponse>>(`${this._url}?size=${pagination[KeyEnum.SIZE]}&direction=${pagination[KeyEnum.DIRECTION]}&page=${pagination[KeyEnum.PAGE]}&orderBy=${pagination[KeyEnum.ORDERBY]}`);
  }
}
