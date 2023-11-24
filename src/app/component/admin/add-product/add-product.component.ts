import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(private productService: ProductService) {}

  addProduct(products: {
    product_name: string;
    product_description: string;
    price: number;
  }) {
    console.log(products);
    let mappedProduct: Product = {
      title: products.product_name,
      description: products.product_description,
      price: products.price,
      categoryId: 221,
    };
    this.productService
      .addProduct(mappedProduct)
      .subscribe((response) => console.log(response));
  }
}
