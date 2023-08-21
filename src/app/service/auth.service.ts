import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {switchMap} from "rxjs/operators";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${this.config.apiUrl}login`;
  logoutUrl: string = `${this.config.apiUrl}logout`;
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  storageName = 'currentUser';
  lastToken: string | null = null;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
  }


  /**
   * Get the user object from local storage (if it exists),
   * Notify subscribed components with the new user value
   */
  setUserFromLocalStorage() {
    if (!this.currentUserSubject.value) {
      const user = JSON.parse(localStorage.getItem(this.storageName) || '{}');
      if (!this.isUserObjectEmpty(user)) {
        this.currentUserSubject.next(user);
      }
    }
  }


  /**
   * Getter for the user object
   */
  get currentUserValue(): User | null {
    this.setUserFromLocalStorage();
    return this.currentUserSubject.value;
  }


  /**
   * Login user and set the value of the user subject and emit this value for the subscribers
   *
   * @param loginData
   */
  login(loginData: User): Observable<{ accessToken: string } | null | { [index: string]: any }> {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      {email: loginData.email, password: loginData.password}
    )

      .pipe(switchMap(response => {
        if (response.accessToken) {
          this.lastToken = response.accessToken;
          return this.userService.query(`email=${loginData.email}`)
        }
        return of(null);
      }))
      .pipe(
        tap(user => {
          if (!user) {
            localStorage.removeItem(this.storageName);
            this.currentUserSubject.next(null);
          } else {

            user[0].token = this.lastToken;

            localStorage.setItem(this.storageName, JSON.stringify(user[0]));
            this.currentUserSubject.next(user[0]);
          }
        })
      )
      ;
  }


  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
    this.router.navigate(['login']).then(r => console.log(r));
  }


  isUserObjectEmpty(obj: User | null) {
    if (obj === null) {
      return false
    }

    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }

}
