import {Observable} from "rxjs";
import {Technology} from "../models/technology";

export abstract class TechnologyGateway {
  abstract addTechnology(technology: Technology): Observable<void>;
  abstract getTechnologies(): Observable<Technology[]>;
}
