import {Observable} from "rxjs";

export abstract class ServiceForm {

  abstract register (model: {}): void;
}
