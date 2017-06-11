import {Component, OnInit} from '@angular/core';
import {AppCommunicationService} from '../shared/service/appCommunication.service';
import {Subscription} from 'rxjs/Subscription';
import {BlockService} from '../shared/service/block.service';

@Component({
  selector: 'app-generator-view',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']

})
export class GeneratorComponent {
  knowledgeId: string;
  productId: string;
  knowledge: object;
  product: object;
  blocks: Array<object>;
  subscription: Subscription;

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

  syncBlocks() {
    this.blockService
      .getBlocksForKnowledge(this.knowledgeId)
      .then(blocks => {
        this.blocks = blocks;
        // console.log('Generator has received blocks!', this.blocks);
      });
  }
}
