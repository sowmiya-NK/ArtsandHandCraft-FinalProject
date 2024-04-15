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
import { count, find, findIndex } from 'rxjs';
import { CartService } from './service/cart.service';
import { StorageService } from './service/storage.service';
import { Cart } from './model/cart';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let storageService: StorageService;
  let cartService: CartService;

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
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: StorageService, CartService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.stub;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('AppComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to cart page after clicking cart icon', () => {
    fixture.detectChanges();
    const cartLink = fixture.debugElement.query(By.css('a[routerink="/cart"]'));

    if (cartLink) {
      expect(cartLink).toBeTruthy();
      cartLink.nativeElement.click();
      let spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable();
      expect(spyNavigate).toHaveBeenCalledWith('/cart');
    }
  });

  it('should navigate to user profile page after clicking user icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="/user/profile"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('/user/profile');
      });
    }
  });

  it('should navigate to order page after clicking order icon', () => {
    fixture.detectChanges();
    const orderLink = fixture.debugElement.query(
      By.css('a[routerLink="/order"]')
    );
    if (orderLink) {
      expect(orderLink).toBeTruthy();
      orderLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('/order');
      });
    }
  });

  it('should increase cart count when clicking on cart button', async () => {
    component.isLoggedIn = true;
    component.isAdmin = false;
    fixture.detectChanges();
    await fixture.whenStable();
    const cartButton = fixture.nativeElement.querySelector('.cartButton');
    console.log('Cart Button:', cartButton);
    cartButton.click();
    console.log(component.cartCount, 'cartValue');
    expect(cartServiceStub.getCartCount).toHaveBeenCalled();
    expect(component.cartCount).toBeGreaterThan(0);
  });

  it('should check count equal to  the cart value', () => {
    const cartClick = fixture.debugElement.query(By.css('#cartButton'));
    if (cartClick) {
      expect(cartClick).toBeTruthy();
      cartClick.nativeElement.click();
    }
    fixture.detectChanges();
    let cartCount = component.cartCount;
    expect(cartServiceStub.getCartCount).toHaveBeenCalled();
    expect(cartCount).toEqual(1);
  });

  // it('should naviagate to all  routes', () => {
  //   const routerLinks = [
  //     '/contactPage',
  //     '/user/profile',
  //     '/cart',
  //     '/order',
  //     '/admin',
  //     '/admin/user',
  //     '/admin/product',
  //     '/admin/categoryview',
  //     '/admin/order',
  //   ];

  //   routerLinks.forEach((routerLink) => {
  //     router.navigate([routerLink]);
  //     expect(router.navigateByUrl).toHaveBeenCalledWith(routerLink);
  //   });
  // });
  // it('should return cart count', () => {
  //   const loggedInUser = { id: 1 };
  //   const cartItems: Cart[] = [
  //     {
  //       userId: 1,
  //       artworkId: 22,
  //       price: 890,
  //       title: 'Canvas Painting Wall Art',
  //       count: 7,
  //     },
  //     {
  //       userId: 1,
  //       artworkId: 22,
  //       price: 890,
  //       title: 'Canvas Painting Wall Art',
  //       count: 3,
  //     },
  //   ];
  //   component.ngOnInit();
  //   spyOn(storageService, 'getLoggedInUser').and.returnValue(loggedInUser);
  //   spyOn(storageService, 'getCart').and.returnValue(cartItems);
   
  //   let c = component.getCartCount();
  //   const expectedCount = cartItems.reduce((total, cart) => {
  //     if (cart.userId === loggedInUser.id) {
  //       total += cart.count;
  //     }
  //     return total;
  //   }, 0);

  //   expect(c).toEqual(expectedCount);
  // });
});
