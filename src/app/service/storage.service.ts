import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { Cart } from '../model/cart';

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
  public getCart(): Cart {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }
}
