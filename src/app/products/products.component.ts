import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public products: Array<Product> = [];
  public keywords: String = "";
  constructor(private productService: ProductService) {

  }
  ngOnInit() {
    this.productService.getProducts(2,4).subscribe({
        next: data => {
          this.products = data
      },
      error: err => {
        console.log(err);
      }
    })
    // this.products$ =this.productService.getProducts();
}

  handleCheckProduct(product: Product) {
   
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
      product.checked =!product.checked
      },
      error: err => {
        console.log(err);
      }
    })
  }
  handleDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: data => {
        // this.productService.getProducts();
        this.products = this.products.filter( p => p.id !=id);
      }, 
      error: err => {
        console.log(err);
      } 
    })
  }

  searchProduct() {
    this.productService.searchProducts(this.keywords).subscribe({
      next: value => this.products=value
    })
  }
}
