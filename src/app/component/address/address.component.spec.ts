import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { AddressComponent } from './address.component';
import { StorageService } from 'src/app/service/storage.service';
import { of } from 'rxjs';

const userDetails = {
  values: {
    name: 'user',
    username: 'user',
    street: 'abc',
    city: 'abc',
    state: 'abc',
    zipcode: 123456,
  },
};
const userId = 1;
const mockResponse: Address[] = [
  {
    street: 'abc',
    city: 'abc',
    state: 'abc',
    zipcode: 123456,
  },
];

describe('AddressComponent', () => {
  // Corrected to 'AddressComponent'
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let service: AddressService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [AddressService, StorageService],
    }).compileComponents();
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AddressService);
    storageService = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  it('AddressComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add address', () => {
    spyOn(storageService, 'getLoggedInUser').and.returnValue({ id: userId });
    spyOn(service, 'postAddress').and.returnValue(of(mockResponse[0]));
    spyOn(storageService, 'setAddress');
    component.onSubmit(userDetails.values);
    expect(service.postAddress).toHaveBeenCalledWith(
      userDetails.values,
      userId
    );
    expect(storageService.setAddress).toHaveBeenCalled();
  });
});
