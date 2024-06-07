import { Observable } from "rxjs";
import { Pagination } from "./pagination";
import { Page } from "src/app/shared/service/interface/Page";
import { ModelsApi, ModelsApiSelect } from "src/app/shared/constants/constants";

export abstract class ServiceForm {
  abstract register(model: {}): Observable<void>;
}

export abstract class GetService {
  abstract getAll(pagination: Pagination): Observable<Page<ModelsApi>>;
}

export abstract class GetAllWithoutPaginationService {
  abstract getAllWithoutPagination(): Observable<ModelsApiSelect[]>
}
