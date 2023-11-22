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
  fetchdata(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/6`);
  }
}
