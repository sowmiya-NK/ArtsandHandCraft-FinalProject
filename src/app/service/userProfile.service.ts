import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { UserProfile } from '../model/user-profile';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  constructor(private http: HttpClient) {}
  fetchdata(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/user/all`
    );
  }

  getUserById(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/${userId}`);
  }
}
