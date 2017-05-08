import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {AppCommunicationService} from '../shared/service/appCommunication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-product-browser',
    templateUrl: './product-browser.component.html'
  }
)
export class ProductBrowserComponent implements OnInit {
  title = 'Product-Browser';
  product = [];
  currentProductId: string;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private appCommunicationService: AppCommunicationService) {
    this.subscription = appCommunicationService.dbChangeAnnounced$.subscribe(
      change => {
        this.syncProduct();
      }
    );
  }

  ngOnInit(): void {
    this.syncProduct();
  }

  setCurrentProductId(id): void {
    this.currentProductId = id;
  }
  syncProduct() {
    this.productService
      .getAllProduct()
      .then(product => {
        this.product = product;
      });
  }
}
