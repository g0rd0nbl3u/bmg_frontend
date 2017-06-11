import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {KnowledgeService} from '../shared/service/knowledge.service';
import {TreeComponent} from 'angular-tree-component';
import * as _ from 'lodash';
import {AppCommunicationService} from '../shared/service/appCommunication.service';

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
          this.appCommunicationService.broadcastKnowledge(this.knowledgeArray[0]);
          // console.log(this.knowledgeArray);
          this.tree.treeModel.update();
        });
    }
  }

  constructor(private knowledgeService: KnowledgeService,
              private appCommunicationService: AppCommunicationService) {
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
    if (confirm('Do you really want to delete this Node?') === true) {
      _.remove(node.parent.data.children, node.data);
      this.tree.treeModel.update();
    } else {
      console.log('Deletion cancelled!');
    }
  }

  syncWithServer() {
    const idToSync = this.knowledgeArray[0]._id;
    console.log(idToSync);
    this.knowledgeService.update(idToSync, this.knowledgeArray[0]);
    console.log('Should be syncing now.');
  }
  showTools(event) {
    event.node.showTools = true;
  }
  hideTools(event) {
    event.node.showTools = false;
  }
}
