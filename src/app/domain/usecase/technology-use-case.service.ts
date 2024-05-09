import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Technology} from "../models/technology";
import {TechnologyGateway} from "../gateway/technology-gateway";

@Injectable({
  providedIn: 'root'
})

export class TechnologyUseCaseService {

  constructor(private _technologyAdapter: TechnologyGateway) { }

  addTechnology(technology: Technology): Observable<void> {
    return this._technologyAdapter.addTechnology(technology);
  }

  getTechnologies(): Observable<Technology[]> {
    return this._technologyAdapter.getTechnologies();
  }
}
