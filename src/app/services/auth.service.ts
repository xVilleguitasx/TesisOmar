import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { UserResponse } from "../models/userResponse.model";
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedId = new BehaviorSubject<boolean>(false);
  api: string = environment.api;
  constructor(private http: HttpClient) {
    this.checkToken();
  }
  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut() : this.loggedId.next(true);
    
  }

  get isLogget(): Observable<boolean> {
    return this.loggedId.asObservable();
  }
  auth(auth: any): any {
    return this.http.post<any>(`${this.api}/auth`, auth).pipe(
      map((res: UserResponse) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("rol", res.rol);
        this.loggedId.next(true);
        return res;
      }),
      catchError((err) => this.error(err))
    );
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.loggedId.next(false);
  }
  private error(err: any): Observable<never> {
    console.log("Error");
    return;
  }
}
