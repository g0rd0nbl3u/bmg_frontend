import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {KnowledgeService} from '../shared/knowledge.service';
import {TreeComponent} from 'angular-tree-component';
import * as _ from 'lodash';

@Component({
  selector: 'app-knowledge-treeview',
  templateUrl: './knowledge-treeview.component.html',
  styleUrls: ['./knowledge-treeview.component.css']
})
export class KnowledgeTreeViewComponent implements OnChanges {
  knowledgeArray = [];
  @Input() knowledgeId: string;

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


  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  ngOnChanges() {
    if (this.knowledgeId) {
      this.knowledgeService
        .getKnowledge(this.knowledgeId)
        .then(knowledge => {
          this.knowledgeArray[0] = knowledge;
          // console.log(this.knowledgeArray);
          this.tree.treeModel.update();
        });
    }
  }

  constructor(private knowledgeService: KnowledgeService) {
  }

  editNode(node) {
    if (node.editMode) {
      node.editMode = false;
    } else {
      node.editMode = true;
    }
  }
  newNode() {
    this.knowledgeArray[0].children.push({
      name: 'Neue Knoten'
    });
    this.tree.treeModel.update();
  }
  deleteNode(node) {
    _.remove(node.parent.data.children, node.data);
    this.tree.treeModel.update();
  }
  syncWithServer() {
    const idToSync = this.knowledgeArray[0]._id;
    console.log(idToSync);
    this.knowledgeService.update(idToSync, this.knowledgeArray[0]);
    console.log('Should be syncing now.');
  }
}