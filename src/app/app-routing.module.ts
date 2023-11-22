import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { authGuard } from './guard/auth.guard';
import { SproductComponent } from './component/sproduct/sproduct.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AddProductComponent } from './component/admin/add-product/add-product.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { AdminComponent } from './component/admin/admin.component';
import { ProductviewComponent } from './component/admin/add-product/productview/productview.component';
import { CategoryviewComponent } from './component/admin/category/categoryview/categoryview.component';
import { UserProfileComponent } from './component/admin/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sproduct', component: SproductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin/addproduct', component: AddProductComponent },
  { path: 'admin/category', component: CategoryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/product', component: ProductviewComponent },
  { path: 'admin/categoryview', component: CategoryviewComponent },
  { path: 'admin/user', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
