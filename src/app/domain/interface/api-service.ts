import {Observable} from "rxjs";
import { Technologies} from "../models/technology";
import { Pagination } from "./pagination";

export abstract class ServiceForm {
  abstract register (model: {}): Observable<void>;
}

export abstract class GetService {
  abstract getAll(pagination: Pagination): Observable<Technologies>;
}
