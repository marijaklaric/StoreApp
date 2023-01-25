import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = new Subject<boolean>();
  public loggedIn = this.isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
   }

  login(username: string, password: string) {
    return this.http.post<any>(environment.baseAPI + "auth/login", { username, password })
      .pipe(map(res => {
        localStorage.setItem("token", res.token);
        this.changeLoggedInStatus(true);
        return res.token;
      }))
      .pipe(catchError(err => {
        if (err.status === 401) {
          return throwError(err.error);
        } else {
          return throwError(err);
        }
      }));
  }

  logout() {
    localStorage.removeItem("token");
    this.changeLoggedInStatus(false);
    this.router.navigateByUrl("/login");
  }


  changeLoggedInStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }
}
