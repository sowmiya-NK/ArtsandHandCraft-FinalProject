import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryviewComponent } from './categoryview.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { of, throwError } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { AppResponse } from 'src/app/model/appResponse';

let dummyCategory: AppResponse = {
  status: 200,
  timestamp: '',
  data: [
    {
      id: 1,
      title: 'test category',
    },
  ],
  error: null,
};

describe('CategoryViewComponent', () => {
  let component: CategoryviewComponent;
  let fixture: ComponentFixture<CategoryviewComponent>;
  let router: Router;
  let httpMock: HttpTestingController;
  let categoryService: CategoryService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryviewComponent],
      imports: [
        HttpClientModule,

        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [CategoryService],
    });
    fixture = TestBed.createComponent(CategoryviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    // fixture.detectChanges();
  });

  it('CategoryViewComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit page when edit button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const categoryId = 128;

    const editButton = fixture.nativeElement.querySelector('#editButton');

    if (editButton) {
      expect(editButton).toBeTruthy();
      editButton.click();
      expect(navigateSpy).toHaveBeenCalledWith(['/admin/category'], {
        queryParams: { id: categoryId },
      });
    }
  });

  it('should delete a category', () => {
    const deleteId = 128;
    const mockResponse: Category[] = [];

    spyOn(categoryService, 'deleteCategory').and.returnValue(of(mockResponse));

    component.onDelete(deleteId);
    const req = httpMock.expectOne(
      `${urlEndpoint.baseUrl}/admin/category/${deleteId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should call ngonInit method', () => {
    categoryService.fetchdata().subscribe();
    spyOn(categoryService, 'fetchdata').and.returnValue(of(dummyCategory));
    component.ngOnInit();
    expect(component.categories).toEqual(dummyCategory.data);
  });

  it('error handling', () => {
    spyOn(categoryService, 'fetchdata').and.returnValue(
      throwError('Error occured')
    );
    component.ngOnInit();
    expect(component.error).toEqual('Error occured');
  });

  it('should call onedit method', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const editId = 1;
    component.onEdit(editId);
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/category'], {
      queryParams: { id: editId },
    });
  });
});
