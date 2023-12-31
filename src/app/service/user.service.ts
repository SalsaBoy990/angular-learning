import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entity: string = 'users';

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }


  get(id?: string | number): Observable<User | User[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get<User[]>(url);
  }

  query(queryString: string): Observable<User[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<User[]>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.config.apiUrl}${this.entity}?${user.id}`;
    return this.http.put<User>(url, user);
  }


}
