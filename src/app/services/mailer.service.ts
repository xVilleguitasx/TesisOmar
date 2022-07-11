import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MailerService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  
  mailInscritos(mailInscritos:any): any{
    return this.http.post(`${this.api}/mailer/mailInscritos`,mailInscritos);
  }
}
