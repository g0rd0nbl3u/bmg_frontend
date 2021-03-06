import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {KnowledgeService} from '../shared/service/knowledge.service';
import {TreeComponent} from 'angular-tree-component';
import {ProductService} from '../shared/service/product.service';
import * as _ from 'lodash';
import {AppCommunicationService} from '../shared/service/appCommunication.service';

@Component({
  selector: 'app-product-treeview',
  templateUrl: './product-treeview.component.html',
  styleUrls: ['./product-treeview.component.css']
})
export class ProductTreeViewComponent implements OnChanges {
  productArray = [];
  @Input() productId: string;
  options = {
    // displayField: 'subTitle',
    // isExpandedField: 'expanded',
    idField: 'uuid',
    allowDrag: true,
    // useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  };

  constructor(private productService: ProductService,
              private appCommunicationService: AppCommunicationService) {
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  ngOnChanges() {
    if (this.productId) {
      this.productService
        .getProduct(this.productId)
        .then(product => {
          this.productArray[0] = product;
          this.appCommunicationService.broadcastProduct(this.productArray[0]);
          // this.productArray[0] = true;
          // console.log(this.knowledgeArray);
          this.tree.treeModel.update();
        });
    }
  }

  editNode(node) {
    if (node.editMode) {
      node.editMode = false;
    } else {
      node.editMode = true;
    }
  }

  newNode() {
    this.productArray[0].children.push({
      value: 'Neue Knoten'
    });
    this.tree.treeModel.update();
  }

  deleteNode(node) {
    if (confirm('Do you really want to delete this Node?') === true) {
      _.remove(node.parent.data.children, node.data);
      this.tree.treeModel.update();
    } else {
      console.log('Deletion cancelled!');
    }
  }

  syncWithServer() {
    const idToSync = this.productArray[0]._id;
    console.log(idToSync);
    this.productService.update(idToSync, this.productArray[0]);
    console.log('Should be syncing now.');
  }
  showTools(event) {
    event.node.showTools = true;
  }
  hideTools(event) {
    event.node.showTools = false;
  }
}
