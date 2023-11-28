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
  editId: number = 0;

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
      id: this.editId,
      title: products.product_name,
      description: products.product_description,
      price: products.price,
      categoryId: 9,
    };
    this.productService
      .addProduct(mappedProduct, this.editId)
      .subscribe((response) => console.log(response));
    this.editId = 0;
    this.productName = '';
    this.description = '';
    this.price = 0;
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      let id = param['id'];
      this.editId = id;
      this.productService.findProductById(id).subscribe({
        next: (products: any) => {
          console.log(products.data);
          console.log('befor', this.productName);
          this.productDetails = products.data;
          this.productName = products.data.title;
          this.description = products.data.description;
          this.price = products.data.price;
          console.log('after', this.productName);
        },
      });
    });
  }
}
