import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BootcampGateway } from 'src/app/domain/gateway/bootcamp-gateway';
import { Bootcamp } from 'src/app/domain/models/bootcamp';
import { environment, Endpoints } from 'src/environments/environment';

@Injectable()
export class BootcampApiService implements BootcampGateway {

  private _url = environment.BASE_URL + Endpoints.BOOTCAMP;

  constructor(private _httpClient: HttpClient) { }


  registerBootcamp(bootcamp: Bootcamp): Observable<void> {
    return this._httpClient.post<void>(this._url, bootcamp);
  }
}
