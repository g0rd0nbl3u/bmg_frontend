import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/service/product.service';
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
    this.appCommunicationService.announceChosenProduct(id);
  }
  syncProduct() {
    this.productService
      .getAllProduct()
      .then(product => {
        this.product = product;
      });
    // console.log(JSON.stringify(this.product, null, 2));
  }
  deleteProduct(id): void {
    if (confirm('Do you really want to delete this Product?') === true) {
      this.productService.delete(id);
    } else {
      console.log('Deletion cancelled!');
    }
  }
}
