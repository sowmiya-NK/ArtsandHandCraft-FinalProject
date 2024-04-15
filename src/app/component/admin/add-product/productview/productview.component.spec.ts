import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductviewComponent } from './productview.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { AppResponse } from 'src/app/model/appResponse';

describe('ProductViewComponent', () => {
  let component: ProductviewComponent;
  let fixture: ComponentFixture<ProductviewComponent>;
  let router: Router;
  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductviewComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: ProductService,
          // useValue: jasmine.createSpyObj('ProductService'),
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('ProductViewComponent should created', () => {
    expect(component).toBeTruthy();
  });
  it('should delete product', () => {
    let productId = 21;
    const deleteProduct: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          id: 21,
          title: 'Door & Wall Hanging Home Decor',
          description: 'handcrafted Rajasthani Door & Wall Hanging Home Decor',
          price: 650,
        },
      ],
      error: null,
    };
    spyOn(productService, 'deleteProduct').and.returnValue(of(deleteProduct));
    component.onDelete(productId);
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should navigate to the next page when Next button is clicked', () => {
    component.currentPage = 1;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }
    component.getPageNumbers();
    fixture.detectChanges();
    component.currentPage += 1;
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to the previous page when Previous button is clicked', () => {
    component.currentPage = 3;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );
    if (previousButton) {
      previousButton.click();
    }
    component.getLastPage();
    fixture.detectChanges();
    component.currentPage -= 1;
    expect(component.currentPage).toBe(2);
  });

  it('should fetch product details', () => {
    const product: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          id: 21,
          title: 'Door & Wall Hanging Home Decor',
          description: 'handcrafted Rajasthani Door & Wall Hanging Home Decor',
          price: 650,
        },
      ],
      error: null,
    };

    productService.fetchdata().subscribe();
    spyOn(productService, 'fetchdata').and.returnValue(of(product));
    component.ngOnInit();
    expect(component.productDetails).toEqual(product.data);
  });

  it('should call onedit method', () => {
    const navigate = spyOn(router, 'navigate');
    const editId = 1;
    component.onEdit(editId);
    expect(navigate).toHaveBeenCalledWith(['/admin/addproduct'], {
      queryParams: { id: editId },
    });
  });
});
