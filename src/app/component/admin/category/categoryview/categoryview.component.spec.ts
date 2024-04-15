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
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { AppResponse } from 'src/app/model/appResponse';

describe('CategoryViewComponent', () => {
  let component: CategoryviewComponent;
  let fixture: ComponentFixture<CategoryviewComponent>;
  let router: Router;
  let httpMock: HttpTestingController;
  let categoryService: CategoryService;
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

  it('should delete an category', () => {
    spyOn(categoryService, 'deleteCategory').and.returnValue(of([]));

    const deleteId = 128;
    const mockResponse: Category[] = [
      {
        id: 128,
        title: 'idole',
      },
      {
        id: 197,
        title: 'test category',
      },
    ];
    component.categories = mockResponse;
    component.onDelete(deleteId);
    fixture.detectChanges();
    expect(
      component.categories.some((category) => category.id === deleteId)
    ).toBeFalse();
  });
});
