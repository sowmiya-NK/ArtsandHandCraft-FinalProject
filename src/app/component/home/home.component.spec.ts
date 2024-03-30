import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FooterComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [ProductService],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('component was created or not', () => {
    expect(component).toBeTruthy();
  });

  // it('should trigger addToCart button', () => {
  //   let btn = fixture.debugElement.query(By.css('#testDiv[button]'));
  //   expect(btn).toBeTruthy();
  //   // fixture.detectChanges();
  //   // fixture.whenStable();

  //   // spyOn(component, 'addToCart');
  //   // btn.triggerEventHandler('click', null);

  //   // expect(component.addToCart).toHaveBeenCalled();
  // });

  it('should call fetchdata method of ProductService on initialization', fakeAsync(() => {
    const testData: Product[] = [
      {
        id: 21,
        title: 'Door & Wall Hanging Home Decor',
        description: 'handcrafted Rajasthani Door & Wall Hanging Home Decor',
        price: 650,
      },
    ];
    const spy = spyOn(productService, 'fetchdata').and.returnValue(
      of(testData)
    );
    console.log('componentdetails',component.productDetails);
    
    
    
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.productDetails).toEqual(testData);
  }));
});
