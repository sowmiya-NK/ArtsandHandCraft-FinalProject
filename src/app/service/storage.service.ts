import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';

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
}
