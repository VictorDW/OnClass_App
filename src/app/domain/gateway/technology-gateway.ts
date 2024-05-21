import {Observable} from "rxjs";
import {Technologies, Technology} from "../models/technology";
import { Pagination } from "../interface/pagination";

export abstract class TechnologyGateway {
  abstract registerTechnology(technology: Technology): Observable<void>;
  abstract getTechnologies(pagination: Pagination): Observable<Technologies>;
}
