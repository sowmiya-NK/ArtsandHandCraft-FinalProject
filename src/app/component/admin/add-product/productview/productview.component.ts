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
  itemsPerPage:number=3;
  currentPage:number=1;
  totalItems:string[]=[];
  displayedItems:string[]=[];


 

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
      next: (response: any) => {
        this.productDetails = response.data;
        console.log(response.data);
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

 //returns total no of pages based on total no of items
 getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.productDetails.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}

 //returns last page
getLastPage(): number {
  return this.getPageNumbers().slice(-1)[0] || 1;
}
}
