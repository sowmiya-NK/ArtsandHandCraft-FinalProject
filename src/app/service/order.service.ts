import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { Orderstatus } from '../model/orderstatus';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  fetchdata(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }
  getAllOrderDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }

  createOrder(
    userId: number,
    artworkId: number,
    addressId: number
  ): Observable<AppResponse> {
    let orderdata = {
      userId: userId,
      artWorkId: artworkId,
      addressId: addressId,
    };
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/order`,
      orderdata
    );
  }
  // // admin order status change
  // getorderStatus(): Observable<Orderstatus[]> {
  //   return this.http.get<Orderstatus[]>(
  //     `${urlEndpoint.baseUrl}/admin/order/status`
  //   );
  // }

  changeOrderStatus(
    orderId: number,
    statusId: string
  ): Observable<AppResponse> {
    let orderstatus = {
      orderId: orderId,
      statusId: statusId,
    };
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/status`,
      orderstatus
    );
  }
}
