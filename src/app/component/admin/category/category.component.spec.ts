import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CategoryComponent } from './category.component';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { AppResponse } from 'src/app/model/appResponse';
import { HttpClientModule } from '@angular/common/http';
import { urlEndpoint } from 'src/app/utils/constant';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

let dummyData: AppResponse = {
  status: 200,
  timestamp: '',
  data: { id: 1, title: 'dummy category' },
  error: null,
};

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CategoryService', ['addCategory']);
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: CategoryService },

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });
  it('CategoryComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should check add to category are adding', () => {
    const categoryForm = {
      value: {
        category_name: 'Test Category',
      },
    } as NgForm;

    const mappedCategory = {
      id: 0,
      title: categoryForm.value.category_name,
    };

    spyOn(categoryService, 'addCategory').and.returnValue(of([]));
    component.addCategory(categoryForm);
    expect(categoryService.addCategory).toHaveBeenCalledWith(
      mappedCategory,
      component.editId
    );
  });

  // it('should send a POST request to add a new category', async () => {
  //   const expectedUrl = `${urlEndpoint.baseUrl}/admin/category`;

  //   categoryService.addCategory(dummyData.data, 0).subscribe((data) => {
  //     {
  //       expect(data).toEqual([]);
  //     }
  //   });
  //   console.log('-----------', expectedUrl);

  //   let req = httpMock.expectOne(expectedUrl);
  //   await fixture.whenStable();
  //   expect(req).toBeTruthy();
  //   expect(req.request.method).toEqual('POST');
  // });

  // it('should call ngOnInit method', () => {
  //   const categoryId = 1;
  //   // categoryService.findCategoryById(categoryId).subscribe();
  //   spyOn(categoryService, 'findCategoryById').and.returnValue(of(dummyData));
  //   activatedRoute.queryParams.next({ id: '2' });
  //   expect(component.editId).toBe('2');
  //   component.ngOnInit();
  //   expect(categoryService.findCategoryById).toHaveBeenCalledWith('2');

  //   expect(component.category_name).toEqual(dummyData.data.title);
  // });
});
