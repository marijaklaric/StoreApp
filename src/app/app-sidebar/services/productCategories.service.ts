import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(
    private http: HttpClient
    ) { }

    getProductCategories(): Observable<[string]> {
      return this.http.get<[string]>(environment.baseAPI + "products/categories");
    }

  }
