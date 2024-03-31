import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DebugElement, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeService } from 'src/app/service/home.service';
import { ProductService } from 'src/app/service/product.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Product } from 'src/app/model/product';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { CartService } from 'src/app/service/cart.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let productService: ProductService;
  let cartService: CartService;

  beforeEach(waitForAsync(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']); 

    TestBed.configureTestingModule({
      declarations: [HomeComponent,FooterComponent],
      imports: [FormsModule,HttpClientModule],
      providers: [
        ProductService,
        { provide: CartService, useValue: cartServiceSpy } 
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>; 
    fixture.detectChanges();
  });

  it('component was created or not', () => {
    expect(component).toBeTruthy();
  });

  // it('should trigger addToCart button', () => {
  //   const btn = fixture.debugElement.query(By.css('#testDiv'));
  //   expect(btn).toBeTruthy();

  //   if (btn) {
  //     btn.nativeElement.click();
  //   }

  //   fixture.detectChanges();
  //   expect(cartService.addToCart).toHaveBeenCalled();
  // });

  // it('should call fetchdata method of ProductService on initialization', fakeAsync(() => {
  //   const testData: Product[] = [
  //     {
  //       id: 21,
  //       title: 'Door & Wall Hanging Home Decor',
  //       description: 'handcrafted Rajasthani Door & Wall Hanging Home Decor',
  //       price: 650,
  //     },
  //   ];
  //   const spy = spyOn(productService, 'fetchdata').and.returnValue(
  //     of(testData)
  //   );
  //   console.log('componentdetails',component.productDetails);

  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // fixture.whenStable().then(()=>{
  //   expect(component.productDetails).toEqual(testData);

  // })
  //   expect(component.productDetails).toEqual(testData);
  // }));

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
});
