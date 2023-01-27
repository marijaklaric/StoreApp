import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  checkIsLoggedIn() {
    return !!localStorage.getItem("token");
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.baseAPI + "auth/login", { username, password })
      .pipe(map(res => {
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl("/");
        return res.token;
      }))
      .pipe(catchError(err => {
        if (err.status === 401) {
          //alert(err.error);
          return throwError(err.error);
        } else {
          return throwError(err);
        }
      }));
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

}
