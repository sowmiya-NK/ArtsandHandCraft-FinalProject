import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
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
  id: number = 0;
  productName: String = '';
  description: String = '';
  price: number = 0;
  categoryid: number = 0;
  productDetails: Product[] = [];
  editId: number = 0;
  file = '';
  category: Category[] = [];
  selectedCategoryId: number = 0;

  product: Product = {
    id: 0,
    title: this.productName,
    description: this.description,
    category: this.selectedCategoryId,
    price: this.price,
  };

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  addProduct(productForm: NgForm) {
    console.log(productForm.value);

    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('id', productForm.value.id);
    formData.append('title', productForm.value.title);
    formData.append('description', productForm.value.description);
    formData.append('categoryId', productForm.value.category);
    formData.append('price', productForm.value.price);
    console.log(formData);

    this.productService
      .addProduct(formData)
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
          if (products && products.data) {
            this.productDetails = products.data;
            this.productName = products.data.title;
            this.description = products.data.description;
            this.price = products.data.price;
          }
        },
      });
      this.categoryService.fetchdata().subscribe((response: any) => {
        if (response && response.data) {
          this.categoryid = response.id;
          this.category = response.data;
        }
      });
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target.files[0];
    this.file = fileInput;
  }

  onCategoryChange() {
    this.categoryService.fetchdata().subscribe({
      next: (category: any) => {
        this.category = category.data;
      },
    });
  }
}
