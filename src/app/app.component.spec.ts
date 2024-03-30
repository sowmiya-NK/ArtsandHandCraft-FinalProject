import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserProfileComponent } from './component/admin/user-profile/user-profile.component';
import { ProductviewComponent } from './component/admin/add-product/productview/productview.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from './guard/auth.guard';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { find } from 'rxjs';
import { CartService } from './service/cart.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  const cartServiceStub: Partial<CartService> = {
    getCartCount: jasmine.createSpy().and.returnValue(1),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ContactPageComponent,
        ProfileComponent,
        CartComponent,
        OrderComponent,
        AdminComponent,
        UserProfileComponent,
        ProductviewComponent,
        CategoryComponent,
        OrderComponent,
        FooterComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'contactPage', component: ContactPageComponent },
          { path: 'user/profile', component: ProfileComponent },
          { path: 'cart', component: CartComponent },
          { path: 'order', component: OrderComponent },
          { path: 'admin', component: AdminComponent },
          { path: 'admin/user', component: UserProfileComponent },
          { path: 'admin/product', component: ProductviewComponent },
          { path: 'admin/categoryview', component: CategoryComponent },
          { path: 'admin/order', component: OrderComponent },
        ]),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: CartService, useValue: cartServiceStub }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('AppComponent should created', () => {
    expect(component).toBeTruthy();
  });

//   it('should render HomeComponent when user is not logged in', () => {
//     router.navigate(['']).then(() => {
//       expect(router.url).toBeNull();
//     });
//     // fixture.detectChanges();
//     // await fixture.whenStable();
//     // const homeComponent = fixture.debugElement.query(By.css('app-home'));
//     // expect(homeComponent).toBeTruthy();
//   });

//   it('should navigate to cart page after clicking cart icon', () => {
//     const cartLink = fixture.debugElement.query(
//       By.css('a[routerlink="/cart"]')
//     );
//     expect(cartLink).toBeTruthy();
//   });

it('should increase cart count when clicking on cart button', async () => {
  component.isLoggedIn=true;
  component.isAdmin=false;
  fixture.detectChanges();
  await fixture.whenStable(); 
  const cartButton = fixture.nativeElement.querySelector('.cartButton');
  console.log('Cart Button:', cartButton);
  cartButton.click(); 
  console.log(component.cartCount,'cartValue');
  expect(cartServiceStub.getCartCount).toHaveBeenCalled();
  expect(component.cartCount).toBeGreaterThan(0);
});

});
