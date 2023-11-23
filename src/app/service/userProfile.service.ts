import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  constructor(private http: HttpClient) {}
  fetchdata(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${urlEndpoint.baseUrl}/admin/user/all`);
  }
}
