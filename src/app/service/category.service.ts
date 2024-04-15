import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public http: HttpClient) {}
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

  addCategory(categories: Category, editId: number): Observable<Category[]> {
    if (editId === 0) {
      return this.http.post<Category[]>(
        `${urlEndpoint.baseUrl}/admin/category`,
        categories
      );
    } else {
      return this.http.put<Category[]>(
        `${urlEndpoint.baseUrl}/admin/category/${editId}`,
        categories
      );
    }
  }

  findCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(
      `${urlEndpoint.baseUrl}/admin/category/${id}`
    );
  }
}
