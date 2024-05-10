import {Observable} from "rxjs";
import {Technology} from "../models/technology";

export abstract class TechnologyGateway {
  abstract registerTechnology(technology: Technology): Observable<void>;
  abstract getTechnologies(): Observable<Technology[]>;
}
