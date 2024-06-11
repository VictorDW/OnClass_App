import { Observable } from "rxjs";
import { Bootcamp, BootcampResponse } from "../models/bootcamp";
import { Page } from "src/app/shared/service/interface/Page";
import { Pagination } from "../interface/pagination";


export abstract class BootcampGateway {
  abstract registerBootcamp(bootcamp: Bootcamp): Observable<void>;
  abstract getBootcamps(pagination: Pagination): Observable<Page<BootcampResponse>>;

}
