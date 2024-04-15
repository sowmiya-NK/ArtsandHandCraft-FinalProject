// import { authGuard } from './auth.guard';

// describe('AuthGuard', () => {
//   let authServiceSpy: jasmine.SpyObj<any>;
//   let storageServiceSpy: jasmine.SpyObj<any>;
//   let routerSpy: jasmine.SpyObj<any>;
//   let route: any;
//   let state: any;

//   beforeEach(() => {
//     authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
//     storageServiceSpy = jasmine.createSpyObj('StorageService', ['setRoute']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     authServiceSpy.isLoggedIn.and.returnValue(false);

//     route = { routeConfig: { path: ' ' } };
//     state = {};

//     spyOn(authGuard, 'call').and.callFake(() => authGuard(route, state));
//     spyOn(authGuard, 'apply').and.callFake(() => authGuard(route, state));
//     spyOn(window, 'inject').and.callFake((token: any) => {
//       if (token === 'AuthService') return authServiceSpy;
//       if (token === 'StorageService') return storageServiceSpy;
//       if (token === 'Router') return routerSpy;
//       return null;
//     });
//   });
// });
