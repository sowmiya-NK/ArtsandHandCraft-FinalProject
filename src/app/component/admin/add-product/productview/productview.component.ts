import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css'],
})
export class ProductviewComponent implements OnInit {
  productDetails: Product[] = [];
  // productDetail: Product = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   price: 0,
  //   category: '',
  // };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.fetchdata().subscribe({
      next: (products: any) => {
        let productDetails: Product[] = products.data;
        console.log(products);

        this.productDetails = productDetails;
        // this.productDetail = productDetails[0];
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
  onDelete(deleteid: number): void {
    console.log(deleteid);

    this.productService.deleteProduct(deleteid).subscribe({
      next: (product: Product[]) => {
        this.productDetails = product;
        console.log(product);
      },
      complete: () => console.log('deleted'),
      error: (err) => console.log('error', err),
    });
  }
  onEdit(editId: number) {
    this.router.navigate(['/admin/addproduct'], {
      queryParams: { id: editId },
    });
  }
}
