import { Injectable } from '@angular/core';
import { Address } from '../model/address';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  postAddress(details: Address, userId: number): Observable<Address> {
    const profile = {
      userId: userId,
      street: details.street,
      city: details.city,
      state: details.state,
      zipcode: details.zipcode,
    };
    return this.http.post<Address>(`${urlEndpoint.baseUrl}/user`, profile);
  }

  deleteAddress(deleteId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/user/${deleteId}`);
  }
}
