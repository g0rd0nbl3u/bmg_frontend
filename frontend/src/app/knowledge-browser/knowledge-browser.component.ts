import {Component, Input, OnInit} from '@angular/core';
import {KnowledgeService} from '../shared/service/knowledge.service';
import {AppCommunicationService} from '../shared/service/appCommunication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-knowledge-browser',
    templateUrl: './knowledge-browser.component.html'
  }
)
export class KnowledgeBrowserComponent implements OnInit {
  title = 'Knowledge-Browser';
  knowledge = [];
  currentKnowledgeId: string;
  subscription: Subscription;

  constructor(private knowledgeService: KnowledgeService,
              private appCommunicationService: AppCommunicationService) {
    this.subscription = appCommunicationService.dbChangeAnnounced$.subscribe(
      change => {
        this.syncKnowledge();
      }
    );
  }

  ngOnInit(): void {
    this.syncKnowledge();
  }

  setCurrentKnowledgeId(id): void {
    this.currentKnowledgeId = id;
    this.appCommunicationService.announceChosenKnowledge(id);
  }

  deleteKnowledge(id): void {
    if (confirm('Do you really want to delete this Knowledge?') === true) {
      this.knowledgeService.delete(id);
    } else {
      console.log('Deletion cancelled!');
    }
  }

  syncKnowledge() {
    this.knowledgeService
      .getAllKnowledge()
      .then(knowledge => {
        this.knowledge = knowledge;
      });
  }
}
