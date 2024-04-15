import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { StorageService } from './storage.service';
import { Order } from '../model/order';
import { OrderService } from './order.service';
import { AppResponse } from '../model/appResponse';

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

  deleteCart(id: number, productId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
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

    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  cartCountUpdate(
    userId: number,
    productId: number,
    c: number,
    t: number
  ): Observable<AppResponse> {
    const requestData = {
      userId: userId,
      artWorkId: productId,
      count: c,
      total: t,
    };
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  getCartCount() {
    let userId = this.storageService.getLoggedInUser();
    let cartArr = this.storageService
      .getCart()
      ?.filter((item: Cart) => item.userId === userId.id);
    if (cartArr) {
      let count: number;
      count = cartArr.reduce((a: number, c: Cart) => {
        if (c.userId === userId.id) {
          a += c.count;
          console.log('cart value -----------', a);
        }
        return a;
      }, 0);
      return count;
    } else {
      return 0;
    }
  }
}
