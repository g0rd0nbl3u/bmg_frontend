import {Component, OnInit} from '@angular/core';
import {KnowledgeService} from '../shared/knowledge.service';

@Component({
    selector: 'app-knowledge-browser',
    templateUrl: './knowledge-browser.component.html'
  }
)
export class KnowledgeBrowserComponent implements OnInit {
  title = 'Knowledge-Browser';
  knowledge = [];
  currentKnowledgeId: string;
  constructor(private knowledgeService: KnowledgeService) {
  }
  ngOnInit(): void {
    this.knowledgeService
      .getAllKnowledge()
      .then(knowledge => {
        this.knowledge = knowledge;
      });
  }
  setCurrentKnowledgeId(id): void {
    this.currentKnowledgeId = id;
  }
}
