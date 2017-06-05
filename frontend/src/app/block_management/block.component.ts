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
  productId: string;
  knowledge: object;
  product: object;
  subscription: Subscription;
  creatingBlockMode = false;
  blocks: object;
  blockInProgress = [];
  tempBlockObject = {
    knowledgeId: null,
    category: null,
    group: null,
    content: null,
    knowledgeholder: null,
    productholder: null
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
      });
    this.subscription = appCommunicationService.broadcastProduct$.subscribe(
      product => {
        this.product = product;
      });
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
      knowledgeholder: null,
      productholder: null
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
    const uuid = $event.element.data.uuid;
    if (this.tempBlockObject.knowledgeholder == null) {
      this.tempBlockObject.knowledgeholder = uuid;
    } else {
      this.tempBlockObject.knowledgeholder = this.tempBlockObject.knowledgeholder + ' ' + uuid;
    }
    console.log($event);
  }

  onDropTempProduct($event) {
    const path = this.buildProductPath($event.element);
    if (this.tempBlockObject.productholder == null) {
      this.tempBlockObject.productholder = path;
    } else {
      this.tempBlockObject.productholder = this.tempBlockObject.productholder + ' ' + path;
    }
    console.log($event);
  }

  onDropEditKnowledge($event, block) {
    const uuid = $event.element.data.uuid;
    if (block.knowledgeholder == null) {
      block.knowledgeholder = uuid;
    } else {
      block.knowledgeholder = block.knowledgeholder + ' ' + uuid;
    }
  }

  onDropEditProduct($event, block) {
    const path = this.buildProductPath($event.element);
    // console.log(block.productholder);
    if (block.productholder == null) {
      block.productholder = path;
    } else {
      block.productholder = block.productholder + ' ' + path;
    }
  }

  buildProductPath(input) {
    return input.data.key + '/' + input.parent.data.value + '/' + input.parent.parent.data.value;
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
}
