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
    private orderService: OrderService
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
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];

  checkOut(): Order[] {
    for (let item of this.cartItem) {
      this.orders.push({
        id: 0,
        total: item.total,
        username: this.storageService.getLoggedInUser().username,
        orderedArtWorkList: [
          {
            id: item.artworkId,
            title: item.title,
            price: item.price,
            count: item.count,
          },
        ],
      });
    }
    this.orderService.createOrder(this.orders).subscribe({
      next: (response: Order[]) => {
        console.log(response);

        this.orders = response;
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
    this.storageService.setOrder(this.orders);
    return this.orders;
  }
}
