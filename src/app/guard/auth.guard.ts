import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  const url = new URL(window.location.href);

  // console.log(loginService.isLoggedIn());
  
  storageService.setRoute(
    route.routeConfig?.path !== undefined?  route.routeConfig.path : null);


  // console.log(route.routeConfig?.path);
  
  

  if (!loginService.isLoggedIn()) {
    router.navigate(['/login'], { replaceUrl: true });
  }

  return loginService.isLoggedIn();
};
