import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
    ) { }

    getProducts(): Observable<Products[]> {
      return this.http.get<Products[]>(environment.baseAPI + "products");
    }

    getProductsByCategory(id): Observable<Products[]> {
      return this.http.get<Products[]>(environment.baseAPI + "products/category/" + id);
    }

    getLimitedProducts(limit: number) {
      let params = new HttpParams();
      params = params.append('limit', limit.toString());
      return this.http.get<Products[]>(environment.baseAPI + 'products', { params });
    }

    putProduct(id, product: Products): Observable<Products> {
      return this.http.put<Products>(environment.baseAPI + "products/" + id, product);
    }

    getProduct(productId: number): Observable<Products> {
      return this.http.get<Products>(environment.baseAPI + "products/" + productId);
    }
  }
