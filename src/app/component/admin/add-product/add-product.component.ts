import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
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
  categoryid: number = 0;
  productDetails: Product[] = [];
  editId: number = 0;
  file = '';
  category:Category[]=[];
  selectedCategoryId: number=0;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  addProduct(products: {
    product_name: string;
    product_description: string;
    price: number;
  }) {
    console.log(products);
    let mappedProduct: Product = {
      id: 0,
      title: products.product_name,
      description: products.product_description,
      price: products.price,
      categoryId:this.selectedCategoryId,
    };
    console.log(mappedProduct);
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('id', mappedProduct.id.toString());
    formData.append('title', mappedProduct.title.toString());
    formData.append('description', mappedProduct.description.toString());
    formData.append('categoryId', mappedProduct.categoryId.toString());
    formData.append('price', mappedProduct.price.toString());

    this.productService
      .addProduct(formData, this.editId)
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
      this.categoryService.fetchdata().subscribe((response:any) => {
          console.log('category',response);
          this.categoryid = response.id;
          this.category=response.data
        
      });
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target.files[0];
    this.file = fileInput;
  }
}
