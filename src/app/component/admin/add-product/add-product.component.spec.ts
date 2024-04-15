import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/model/category';

const categoryData: AppResponse = {
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

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: Router;
  let categoryService: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'addProduct',
      'findProductById',
    ]);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'fetchdata',
    ]);

    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { id: '1' } },
            queryParams: of({ id: '1' }),
          },
        },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
      ],
    });

    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    categoryService = TestBed.inject(
      CategoryService
    ) as jasmine.SpyObj<CategoryService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('AddProductComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should call add product method', () => {
    const productForm: FormData = new FormData();
    productForm.append('id', '1');
    productForm.append('title', 'product title');
    productForm.append('description', 'product description');
    productForm.append('category', '1');
    productForm.append('price', '1000');

    const responseData: AppResponse = {
      status: 200,
      timestamp: Date.now(),
      data: 'mockResponseData',
      error: null,
    };

    productService.addProduct.and.returnValue(of(responseData));
    const mockForm = { value: productForm } as NgForm;
    component.addProduct(mockForm);

    expect(productService.addProduct).toHaveBeenCalledWith(productForm);
  });

  it('should fetch product details and categories on initialization', () => {
    let dummyProduct: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          id: 1,
          title: 'test product',
          description: 'test description',
          price: 1000,
        },
      ],
      error: null,
    };

    productService.findProductById.and.returnValue(of(dummyProduct));

    categoryService.fetchdata.and.returnValue(of(categoryData));

    component.ngOnInit();

    expect(productService.findProductById).toHaveBeenCalled();
    expect(component.productDetails).toEqual(dummyProduct.data);
    expect(component.categoryid).toEqual(categoryData.data.id);
  });

  it('should call onCategoryChange method', () => {
    categoryService.fetchdata.and.returnValue(of(categoryData));
    component.onCategoryChange();
    expect(component.category).toEqual(categoryData.data);
  });
});
