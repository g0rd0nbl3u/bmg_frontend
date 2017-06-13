import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppCommunicationService {
  // Observable string sources
  private dbChangeAnnouncementSource = new Subject<string>();
  private knowledgeChosenAnnouncementSource = new Subject<string>();
  private productChosenAnnouncementSource = new Subject<string>();
  private blockChangeAnnouncementSource = new Subject<string>();
  private broadcastKnowledgeSource = new Subject<object>();
  private broadcastProductSource = new Subject<object>();

  // Observable string streams
  dbChangeAnnounced$ = this.dbChangeAnnouncementSource.asObservable();
  knowledgeChosenAnnounced$ = this.knowledgeChosenAnnouncementSource.asObservable();
  productChosenAnnounced$ = this.productChosenAnnouncementSource.asObservable();
  blockChangeAnnounced$ = this.blockChangeAnnouncementSource.asObservable();
  broadcastKnowledge$ = this.broadcastKnowledgeSource.asObservable();
  broadcastProduct$ = this.broadcastProductSource.asObservable();

  // Service message commands
  announceDbChange(change: string) {
    this.dbChangeAnnouncementSource.next(change);
    console.log('Broadcastet a DB change');
  }

  announceChosenKnowledge(knowledgeId: string) {
    this.knowledgeChosenAnnouncementSource.next(knowledgeId);
  }

  announceChosenProduct(productId: string) {
    this.productChosenAnnouncementSource.next(productId);
  }

  announceBlockChanged(change: string) {
    // console.log('Communicator announces Block Change');
    this.blockChangeAnnouncementSource.next(change);
  }

  broadcastKnowledge(knowledge: object) {
    // console.log('Communicator broadcasts knowledge');
    this.broadcastKnowledgeSource.next(knowledge);
  }
  broadcastProduct(product: object) {
    // console.log('Communicator broadcasts product');
    this.broadcastProductSource.next(product);
  }
}
