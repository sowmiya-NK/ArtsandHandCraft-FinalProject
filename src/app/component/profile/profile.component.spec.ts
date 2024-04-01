import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AddressService } from 'src/app/service/address.service';
import { of } from 'rxjs';
import { Address } from 'src/app/model/address';

describe('profileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let routes: Router;
  let addressService: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [AddressService],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    routes = TestBed.inject(Router);
    addressService = TestBed.inject(AddressService);
    fixture.detectChanges();
  });

  it('profileComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check router link', () => {
    const routerLinkButton = fixture.debugElement.query(
      By.css('a[routerlink="/"]')
    );
    expect(routerLinkButton).toBeTruthy();
    const spyNavigate = spyOn(routes, 'navigateByUrl');
    routerLinkButton.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(spyNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should check add address router link', () => {
    const addressRouterLink = fixture.debugElement.query(
      By.css('a[routerlink="/user/address"]')
    );
    expect(addressRouterLink).toBeTruthy();
    const spyNavigate = spyOn(routes, 'navigateByUrl');
    addressRouterLink.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(spyNavigate).toHaveBeenCalledWith('/user/address');
    });
  });

  it('should delete an address', () => {
    const deleteId = 273;
    const mockAddress: Address = {
      userId: 9,
      street: 'abc',
      city: 'abc',
      state: 'abc',
      zipcode: 123456,
    };
    spyOn(addressService, 'deleteAddress').and.returnValue(of(mockAddress));
    component.deleteAddress(deleteId);
    expect(addressService.deleteAddress).toHaveBeenCalledWith(deleteId);
  });
});
