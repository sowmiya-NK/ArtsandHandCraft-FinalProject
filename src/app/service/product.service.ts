import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  fetchdata(): Observable<Product[]> {
    return this.http.get<Product[]>(`${urlEndpoint.baseUrl}/admin/artWork/all`);
  }
  deleteProduct(id: number): Observable<Product[]> {
    return this.http.delete<Product[]>(
      `${urlEndpoint.baseUrl}/admin/artWork/${id}`
    );
  }
  // addProduct(newProducts: Product[]): Observable<Product[]> {}
}
