import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  // route setting
  public setRoute(route: string | null): void {
    if (route != null) localStorage.setItem('route', route);
  }

  public getRoute(): string | null {
    return localStorage.getItem('route');
  }

  public removeRoute(): void {
    localStorage.removeItem('route');
  }

  //cart set
  public setCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  public getCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  public removeCart(): void {
    localStorage.removeItem('cart');
  }

  //order
  public setOrder(order: Order[]): void {
    localStorage.setItem('order', JSON.stringify(order));
  }
  public getOrder(): Order {
    return JSON.parse(localStorage.getItem('order') || '{}');
  }
  public removeOrder(): void {
    localStorage.removeItem('order');
  }

  //set addressdetails
  public setAddress(address: Address): void {
    localStorage.setItem('address', JSON.stringify(address));
  }
  public getAddress(): Order {
    return JSON.parse(localStorage.getItem('address') || '{}');
  }
  public removeAddress(): void {
    localStorage.removeItem('address');
  }

  //setauth data(username,password binding and store)
  setAuthData(authData: string) {
    localStorage.setItem('authData', authData);
  }

  public getAuthData(): string | null {
    return localStorage.getItem('authData');
  }

  public removeAuthData(): void {
    localStorage.removeItem('authData');
  }
}
