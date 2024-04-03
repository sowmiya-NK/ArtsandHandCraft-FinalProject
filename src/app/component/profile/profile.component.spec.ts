import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AddressService } from 'src/app/service/address.service';
import { of } from 'rxjs';
import { Address } from 'src/app/model/address';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfile } from 'src/app/model/user-profile';

describe('profileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let addressService: AddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [AddressService],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    addressService = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('profileComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  // it('should check router link', () => {
  //   const routerLinkButton = fixture.debugElement.query(
  //     By.css('a[routerLink="/"]')
  //   );

  //   expect(routerLinkButton).toBeTruthy();
  //   spyOn(router, 'navigateByUrl');
  //   routerLinkButton.nativeElement.click();

  //   expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  // });

  // it('should check add address router link', () => {
  //   const addressRouterLink = fixture.debugElement.query(
  //     By.css('a[routerLink="/user/address"]')
  //   );
  //   if (addressRouterLink) {
  //     expect(addressRouterLink).toBeTruthy();
  //     addressRouterLink.nativeElement.click();
  //     const spyNavigate = spyOn(router, 'navigateByUrl');
  //     fixture.detectChanges();

  //     expect(spyNavigate).toHaveBeenCalledWith('/user/address');
  //   }
  // });

  it('should delete an address', () => {
    const deleteId = 273;
    const mockAddress: Address = {
      id: 9,

      street: 'abc',
      city: 'abc',
      state: 'abc',
      zipcode: 123456,
    };

    addressService.deleteAddress(deleteId).subscribe((data) => {
      expect(data).toEqual(mockAddress);
    });

    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/user/${deleteId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(mockAddress);
  });
});
