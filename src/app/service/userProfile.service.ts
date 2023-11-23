import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  constructor(private http: HttpClient) {}
  fetchdata(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${urlEndpoint.baseUrl}/admin/user/all`);
  }
}
