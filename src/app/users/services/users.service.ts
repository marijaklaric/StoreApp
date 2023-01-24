import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
    ) { }

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(environment.baseAPI + "users");
    }

    getUser(userId: number): Observable<User> {
      return this.http.get<User>(environment.baseAPI + "users/" + userId);
    }

    putUser(id, user: User): Observable<User> {
      return this.http.put<User>(environment.baseAPI + "users/" + id, user);
    }

    deleteUser(userId: number): Observable<User> {
      return this.http.delete<User>(environment.baseAPI + "users/" + userId);
    }

    postUser(user: User): Observable<User> {
      return this.http.post<User>(environment.baseAPI + "users", user);
    }
  }
