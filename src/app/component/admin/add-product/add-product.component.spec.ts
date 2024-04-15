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
    const productData: Product[] = [
      {
        id: 1,
        title: 'product title',
        description: 'product description',
        price: 1000,
      },
    ];

    const categoryData: Category[] = [
      {
        id: 1,
        title: 'test category',
      },
    ];

    productService.findProductById.and.returnValue(of(productData[0]));

    categoryService.fetchdata.and.returnValue(of(categoryData));

    component.ngOnInit();

    expect(productService.findProductById).toHaveBeenCalled();
  });
});
