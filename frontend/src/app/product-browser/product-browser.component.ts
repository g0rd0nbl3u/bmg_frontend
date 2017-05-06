import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
    selector: 'app-product-browser',
    templateUrl: './product-browser.component.html'
  }
)
export class ProductBrowserComponent implements OnInit {
  title = 'Product-Browser';
  product = [];
  currentProductId: string;
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService
      .getAllProduct()
      .then(product => {
        this.product = product;
      });
  }
  setCurrentProductId(id): void {
    this.currentProductId = id;
  }
}
