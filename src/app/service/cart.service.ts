import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemCount: number = 1;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  fetchdata(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }
  deleteCart(id: number, productId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${productId}`
    );
  }

  addToCart(userId: number, productId: number): Observable<Cart[]> {
    let count: number = 1;
    const requestData = {
      userId: userId,
      artWorkId: productId,
      count: count,
    };
    console.log(requestData);

    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  cartCountUpdate(
    userId: number,
    productId: number,
    c: number,
    t: number
  ): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      artWorkId: productId,
      count: c,
      total: t,
    };
    console.log(requestData);

    return this.http.put<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }
  // getCartCount() {
  //   console.log(this.storageService.getCart());
  // }
}
