import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {KnowledgeService} from '../shared/knowledge.service';
import {TreeComponent} from 'angular-tree-component';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-treeview',
  templateUrl: './product-treeview.component.html',
  styleUrls: ['./product-treeview.component.css']
})
export class ProductTreeViewComponent implements OnChanges {
  productArray = [];
  @Input()productId: string;
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

  constructor(private productService: ProductService) {
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  ngOnChanges() {
    if (this.productId) {
      this.productService
        .getProduct(this.productId)
        .then(product => {
          this.productArray[0] = product;
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
}
