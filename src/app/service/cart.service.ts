import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { StorageService } from './storage.service';
import { Order } from '../model/order';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemCount: number = 1;
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
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
    return this.http.put<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  getCartCount() {
    let userId = this.storageService.getLoggedInUser();
    let cartArr = this.storageService
      .getCart()
      ?.filter((item: Cart) => item.userId === userId.id);
    // console.log(userId);
    // console.log(cartArr);
    if (cartArr) {
      let count: number;
      count = cartArr.reduce((a: number, c: Cart) => {
        if (c.userId === userId.id) {
          a += c.count;
        }
        return a;
      }, 0);
      return count;
    } else {
      return 0;
    }
  }
}
