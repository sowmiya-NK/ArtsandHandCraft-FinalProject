import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  fetchdata(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }
  deleteCart(id: number, productId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/admin/artWork/${id}/${productId}`
    );
  }

  addToCart(userId: number): Observable<Cart[]> {
    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, userId);
  }
}
