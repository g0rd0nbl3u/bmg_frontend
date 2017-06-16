import {Component, OnInit} from '@angular/core';
import {AppCommunicationService} from '../shared/service/appCommunication.service';
import {Subscription} from 'rxjs/Subscription';
import {BlockService} from '../shared/service/block.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']

})
export class BlockComponent {
  knowledgeId: string;
  categories: Array<string>;
  productId: string;
  knowledge: object;
  product: object;
  subscription: Subscription;
  creatingBlockMode = false;
  blocks: Array<object>;
  showCategory: string;
  blockInProgress = [];
  tempBlockObject = {
    knowledgeId: null,
    category: null,
    group: null,
    content: null,
    knowledgeholder: [],
    productholder: []
  };

  constructor(private appCommunicationService: AppCommunicationService,
              private blockService: BlockService) {
    this.subscription = appCommunicationService.knowledgeChosenAnnounced$.subscribe(
      id => {
        this.knowledgeId = id;
        this.syncBlocks();
      }
    );
    this.subscription = appCommunicationService.productChosenAnnounced$.subscribe(
      id => {
        this.productId = id;
      }
    );
    this.subscription = appCommunicationService.blockChangeAnnounced$.subscribe(
      change => {
        this.syncBlocks();
      });
    this.subscription = appCommunicationService.broadcastKnowledge$.subscribe(
      knowledge => {
        this.knowledge = knowledge;
        this.updateCategories(knowledge);
      });
    this.subscription = appCommunicationService.broadcastProduct$.subscribe(
      product => {
        this.product = product;
      });
    this.subscription = appCommunicationService.dbChangeAnnounced$.subscribe(
      change => {
        this.syncBlocks();
      }
    );
  }

  newBlock() {
    this.creatingBlockMode = true;
  }

  abort() {
    this.creatingBlockMode = false;
    this.clearTempBlock();
  }

  clearTempBlock() {
    this.tempBlockObject = {
      knowledgeId: null,
      category: null,
      group: null,
      content: null,
      knowledgeholder: [],
      productholder: []
    };
  }

  saveBlock() {
    const tmp = this.tempBlockObject;
    if (tmp.category && tmp.group && tmp.content) {
      this.blockService.add({
        knowledgeId: this.knowledgeId,
        category: tmp.category,
        group: tmp.group,
        content: tmp.content,
        knowledgeholder: tmp.knowledgeholder,
        productholder: tmp.productholder
      }).then(res => {
        this.syncBlocks();
      });
      this.clearTempBlock();
      this.creatingBlockMode = false;
    } else {
      alert('Block incomplete :(');
    }
  }

  syncBlocks() {
    this.blockService
      .getBlocksForKnowledge(this.knowledgeId)
      .then(blocks => {
        this.blocks = blocks;
      });
  }

  deleteBlock(id) {
    if (confirm('Do you really want to delete this Block?') === true) {
      this.blockService.delete(id);
    } else {
      console.log('Deletion cancelled!');
    }
  }

  updateBlock(id: string, block: object) {
    this.blockService.update(id, block);
    this.blockInProgress = null;
  }

  editBlock(id) {
    this.blockInProgress = id;
  }

  editingThisBlock(id) {
    if (this.blockInProgress === id) {
      return true;
    }
  }

  onDropTempKnowledge($event) {
    if (this.tempBlockObject.knowledgeholder.length === 0) {
      this.tempBlockObject.knowledgeholder[0] = $event.element.data;
    } else {
      this.tempBlockObject.knowledgeholder.push($event.element.data);
    }
    // console.log(this.tempBlockObject.knowledgeholder);
  }

  onDropTempProduct($event) {
    if (this.tempBlockObject.productholder.length === 0) {
      this.tempBlockObject.productholder[0] = $event.element.data;
    } else {
      this.tempBlockObject.productholder.push($event.element.data);
    }
    console.log($event);
  }

  onDropEditKnowledge($event, block) {
    if (!block.knowledgeholder) {
      block.knowledgeholder = [];
    }
    if (block.knowledgeholder.length === 0) {
      block.knowledgeholder[0] = $event.element.data;
    } else {
      block.knowledgeholder.push($event.element.data);
    }
    console.log('called?');
  }

  onDropEditProduct($event, block) {
    if (!block.productholder) {
      block.productholder = [];
    }
    if (block.productholder.length === 0) {
      block.productholder[0] = $event.element.data;
    } else {
      block.productholder.push($event.element.data);
    }
  }

  allowDropKnowledge(element) {
    return true;
    // Return true/false based on element
  }

  allowDropProduct(element) {
    return true;
    // Return true/false based on element
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // TODO
  deleteFromKnowledgeholder(element, holder) {
    console.log(holder.indexOf(element));
    holder.splice(holder.indexOf(element), 1);
  }

  logMe(p) {
    console.log(p);
  }

  updateCategories(knowledge) {
    const numCats = knowledge.children.length;
    this.categories = [];
    for (let i = 0; i < numCats; i++) {
      this.categories.push(knowledge.children[i].name);
    }
  }
}
