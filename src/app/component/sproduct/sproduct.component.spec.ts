import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { SproductComponent } from './sproduct.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { RouterTestingModule } from '@angular/router/testing';

describe('SingleProductComponent', () => {
  let component: SproductComponent;
  let fixture: ComponentFixture<SproductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: any;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'fetchdata',
      'findProductById',
    ]);
    TestBed.configureTestingModule({
      declarations: [SproductComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { id: '1' } },
            queryParams: of({ id: '1' }),
          },
        },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(SproductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('SingleProductComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a single product using a product id', () => {
    const productData: Product[] = [
      {
        id: 1,
        title: 'product title',
        description: 'product description',
        price: 1000,
      },
    ];

    productService.fetchdata.and.returnValue(of(productData));
    productService.findProductById.and.returnValue(of(productData[0]));
    component.ngOnInit();

    expect(productService.findProductById).toHaveBeenCalled();
  });
});
