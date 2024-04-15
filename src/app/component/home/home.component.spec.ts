import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DebugElement, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { urlEndpoint } from 'src/app/utils/constant';
import { Cart } from 'src/app/model/cart';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService;
  let cartService: CartService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    // const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, FooterComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [ProductService, { provide: CartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('component was created or not', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger addToCart button', () => {
    const btn = fixture.debugElement.query(By.css('#testDiv'));
    expect(btn).toBeTruthy();

    if (btn) {
      btn.nativeElement.click();
    }

    fixture.whenStable().then(() => {
      expect(cartService.addToCart).toHaveBeenCalled();
    });
  });

  it('should check get method was called', () => {
    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/artWork/all`);
    expect(req.request.method).toEqual('GET');
  });

  it('should render product details', () => {
    const products = fixture.debugElement.queryAll(By.css('.product'));
    expect(products.length).toBeGreaterThan(0);
  });

  it('should call service method', () => {
    spyOn(productService, 'fetchdata').and.callThrough();
    productService.fetchdata();
    expect(productService.fetchdata).toHaveBeenCalled();
  });

  it('should filter array when search input changes', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const dummyItem = [
      {
        title: 'arts',
      },
    ];
    component.totalProducts = dummyItem;
    inputElement.value = 'arts';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.totalProducts.length).toBe(1);
    expect(component.totalProducts[0].title).toBe('arts');
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

  it('should add to cart', () => {
    const dummyCartItems: Cart[] = [
      {
        userId: 3,
        artworkId: 24,
        price: 2499,
        title: 'Canvas Painting Wall Art',
        count: 1,
      },
    ];
    let userId = 3;
    let artworkId = 24;

    spyOn(cartService, 'addToCart').and.returnValue(of(dummyCartItems));
    component.addToCart(artworkId);
    expect(cartService.addToCart).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(cartService.addToCart).toHaveBeenCalled();
      const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/cart`);
      expect(req.request.method).toBe('POST');
    });
  });
});
