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
import { AppResponse } from 'src/app/model/appResponse';
import { UserprofileService } from 'src/app/service/userProfile.service';

const mockAddress: AppResponse = {
  timestamp: '',
  data: [{ id: 9, street: 'abc', city: 'abc', state: 'abc', zipcode: 123456 }],
  error: null,
  status: 200,
};
describe('profileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let addressService: AddressService;
  let httpMock: HttpTestingController;
  let userProfileService: UserprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [AddressService, UserprofileService],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    addressService = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
    userProfileService = TestBed.inject(UserprofileService);
    fixture.detectChanges();
  });

  it('profileComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should delete an address', () => {
    const deleteId = 273;

    addressService.deleteAddress(deleteId).subscribe((data) => {
      expect(data).toEqual(mockAddress.data);
    });
    spyOn(addressService, 'deleteAddress').and.returnValue(of(mockAddress));
    component.deleteAddress(deleteId);
    expect(component.deleteAddress1).toEqual(mockAddress.data);
    // const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/user/${deleteId}`);
    // expect(req.request.method).toBe('DELETE');

    // req.flush(mockAddress);
  });

  it('should call ngOnInit method', () => {
    const userId = 9;
    userProfileService.getUserById(userId).subscribe();
    spyOn(userProfileService, 'getUserById').and.returnValue(of(mockAddress));
    component.ngOnInit();
    // expect(userProfileService.getUserById).toHaveBeenCalledWith(userId);
    expect(component.userprofile).toEqual(mockAddress.data);
  });
});
