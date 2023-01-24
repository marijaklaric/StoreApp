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
/*
    putUser(id, product: Products): Observable<Products> {
      return this.http.put<Products>(environment.baseAPI + "products/" + id, product);
    }

    getUser(productId: number): Observable<Products> {
      return this.http.get<Products>(environment.baseAPI + "products/" + productId);
    }

    deleteUser(productId: number): Observable<Products> {
      return this.http.delete<Products>(environment.baseAPI + "products/" + productId);
    }

    postUser(product: Products): Observable<Products> {
      return this.http.post<Products>(environment.baseAPI + "products", product);
    } */
  }
