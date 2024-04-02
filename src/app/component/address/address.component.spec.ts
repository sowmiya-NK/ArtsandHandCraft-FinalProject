import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { urlEndpoint } from 'src/app/utils/constant';
import { AppComponent } from 'src/app/app.component';
import { AddressComponent } from './address.component';

describe('AddressService', () => {
  let service: AddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressService],
    });
    service = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('AddressComponent should create', () => {
    expect(AddressComponent).toBeTruthy();
  });

  it('should add address', () => {
    const dummyAddress: Address = {
      userId: 1,
      street: 'xyz',
      city: 'xyz',
      state: 'xyz',
      zipcode: 123456,
    };
    const userId = 1;

    service.postAddress(dummyAddress, userId).subscribe((data) => {
      expect(data).toEqual(dummyAddress);
    });

    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyAddress);

    req.flush(dummyAddress);
  });
});
