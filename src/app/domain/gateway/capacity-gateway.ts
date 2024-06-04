import { Observable } from "rxjs";
import { Capacity } from "../models/capacity";
import { Pagination } from "../interface/pagination";
import { Page } from "src/app/shared/service/interface/Page";

export abstract class CapacityGateway {
    abstract registerCapacity(capacity: Capacity): Observable<void>;
    abstract getCapacities(pagination: Pagination): Observable<Page<Capacity>>;
}