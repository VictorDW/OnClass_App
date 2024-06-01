import { Observable } from "rxjs";
import { Technology } from "../models/technology";
import { Pagination } from "../interface/pagination";
import { Page } from "src/app/shared/service/interface/Page";

export abstract class TechnologyGateway {
  abstract registerTechnology(technology: Technology): Observable<void>;
  abstract getTechnologies(pagination: Pagination): Observable<Page<Technology>>;
}
