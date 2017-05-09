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
  subscription: Subscription;
  creatingBlockMode = false;
  blocks: object;
  blockInProgress = [];
  tempBlockObject = {
    knowledgeId: null,
    category: null,
    group: null,
    content: null
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
      content: null
    };
  }

  saveBlock() {
    const tmp = this.tempBlockObject;
    if (tmp.category && tmp.group && tmp.content) {
      this.blockService.add({
        knowledgeId: this.knowledgeId,
        category: tmp.category,
        group: tmp.group,
        content: tmp.content
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
        console.log(blocks);
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
    console.log('Guck hier');
    console.log(block);
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
