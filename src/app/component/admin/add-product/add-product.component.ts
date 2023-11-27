import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productName: String = '';
  description: String = '';
  price: number = 0;
  productDetails: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

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
      categoryId: 9,
    };
    this.productService
      .addProduct(mappedProduct)
      .subscribe((response) => console.log(response));
  }

  id: number = 0;
  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.id = param['id'];
      this.productService.fetchdata().subscribe({
        next: (products: any) => {
          let productDetails: Product[] = products.data;
          console.log(productDetails);
          this.productDetails = productDetails;

          // this.productDetail = productDetails[0];
        },
      });
    });
  }
  edit() {
    let newproduct: Product = this.productDetails.find(
      (product) => product.id === this.id
    )!;
    this.productName = newproduct.title;
    this.description = newproduct.description;
    this.price = newproduct.price;
  }
}
