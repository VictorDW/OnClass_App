import { Observable } from "rxjs";
import { Auth, AuthResponse } from "../models/auth";

export abstract class AuthGateway {
    abstract login(auth: Auth): Observable<AuthResponse>;
 }