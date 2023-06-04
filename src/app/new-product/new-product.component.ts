import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {

  }
  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        name : this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        checked : this.formBuilder.control(false),
      })
  }

  saveProduct() {
    let product: Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
