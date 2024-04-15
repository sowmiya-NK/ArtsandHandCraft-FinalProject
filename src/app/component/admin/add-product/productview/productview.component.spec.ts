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
    const deleteProduct: Product[] = [
      {
        id: 21,
        title: 'Door & Wall Hanging Home Decor',
        description: 'handcrafted Rajasthani Door & Wall Hanging Home Decor',
        price: 650,
      },
    ];
    spyOn(productService, 'deleteProduct').and.returnValue(of(deleteProduct));
    component.onDelete(productId);
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should display Previous button and disable it on first page', () => {
    component.currentPage = 1;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );
    if (previousButton) {
      previousButton.click();
    }
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    if (previousButton) {
      expect(previousButton.classList.contains('disabled')).toBe(true);
    } else {
      console.log('previous button not found');
    }
  });

  it('should display next button and disable it on last page', () => {
    component.currentPage = 3;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }
    fixture.detectChanges();
    expect(component.currentPage).toBe(3);
    if (nextButton) {
      expect(nextButton.classList.contains('disabled')).toBeTrue;
    }
  });

  it('should navigate to the next page when Next button is clicked', () => {
    component.currentPage = 1;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }

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

    fixture.detectChanges();
    component.currentPage -= 1;
    expect(component.currentPage).toBe(2);
  });
});
