import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Technology} from "../models/technology";
import {TechnologyGateway} from "../gateway/technology-gateway";
import { ServiceForm } from "../interface/api-service";

@Injectable()
export class TechnologyUseCaseService implements ServiceForm {

  constructor(private _technologyAdapter: TechnologyGateway) { }

  register(technology: Technology): Observable<void>{
    return this._technologyAdapter.registerTechnology(technology);
  }

}
