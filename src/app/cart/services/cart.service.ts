import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
    ) { }

    getCartItems(): Observable<Cart[]> {
      return this.http.get<Cart[]>(environment.baseAPI + "carts");
    }

    putCart(id, cart: Cart): Observable<Cart> {
      return this.http.put<Cart>(environment.baseAPI + "carts/" + id, cart);
    }

    getCart(cartId: number): Observable<Cart> {
      return this.http.get<Cart>(environment.baseAPI + "carts/" + cartId);
    }

    deleteCart(cartId: number): Observable<Cart> {
      return this.http.delete<Cart>(environment.baseAPI + "carts/" + cartId);
    }

    postCart(cart: Cart): Observable<Cart> {
      return this.http.post<Cart>(environment.baseAPI + "carts", cart);
    }
  }
