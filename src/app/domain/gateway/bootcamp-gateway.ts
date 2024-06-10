import { Observable } from "rxjs";
import { Bootcamp, BootcampResponse } from "../models/bootcamp";


export abstract class BootcampGateway {
  abstract registerBootcamp(bootcamp: Bootcamp): Observable<void>;

}
