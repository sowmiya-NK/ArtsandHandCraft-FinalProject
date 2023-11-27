import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { SproductComponent } from './component/sproduct/sproduct.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddProductComponent } from './component/admin/add-product/add-product.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { ProductviewComponent } from './component/admin/add-product/productview/productview.component';
import { CategoryviewComponent } from './component/admin/category/categoryview/categoryview.component';
import { UserProfileComponent } from './component/admin/user-profile/user-profile.component';
import { AdminOrderComponent } from './component/admin/admin-order/admin-order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { StatsuChekingComponent } from './component/statsu-cheking/statsu-cheking.component';
import { ReceiptPageComponent } from './component/receipt-page/receipt-page.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    SproductComponent,
    CartComponent,
    OrderComponent,
    AdminComponent,
    AddProductComponent,
    CategoryComponent,
    ProductviewComponent,
    CategoryviewComponent,
    UserProfileComponent,
    AdminOrderComponent,
    ProfileComponent,
    StatsuChekingComponent,
    ReceiptPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
