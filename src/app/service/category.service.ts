import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  fetchdata(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${urlEndpoint.baseUrl}/admin/category/all`
    );
  }
  deleteCategory(id: number): Observable<Category[]> {
    return this.http.delete<Category[]>(
      `${urlEndpoint.baseUrl}/admin/category/${id}`
    );
  }

  addCategory(categories: Category): Observable<Category[]> {
    return this.http.post<Category[]>(
      `${urlEndpoint.baseUrl}/admin/category`,
      categories
    );
  }

  putCategory(category: Category): Observable<Category[]> {
    return this.http.put<Category[]>(
      `${urlEndpoint.baseUrl}/admin/category`,
      category
    );
  }
}
