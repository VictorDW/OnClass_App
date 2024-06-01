import { Observable } from "rxjs";
import { Technology} from "../models/technology";
import { Pagination } from "./pagination";
import { Page } from "src/app/shared/service/interface/Page";
import { ModelsApi } from "src/app/shared/constants/constants";

export abstract class ServiceForm {
  abstract register (model: {}): Observable<void>;
}

export abstract class GetService {
  abstract getAll(pagination: Pagination): Observable<Page<ModelsApi>>;
}
