import {Component, EventEmitter, Output} from '@angular/core';
import {UploadService} from '../shared/service/upload.service';
import {AppCommunicationService} from '../shared/service/appCommunication.service';

@Component({
  selector: 'app-uploadview',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UploadService]
})
export class UploadComponent {
  title = 'Upload-Component';

  constructor(private uploadService: UploadService,
              private appCommunicationService: AppCommunicationService) {
  }

  onSelectKnowledge(file) {
    this.uploadService.upload(file[0], 'upload/knowledge').subscribe(
      json => {
        this.broadcastDbChange();
        return console.log(json);
      },
      error => console.log(error)
    );
  }

  onSelectProduct(file) {
    this.uploadService.upload(file[0], 'upload/product').subscribe(
      json => {
        this.broadcastDbChange();
        return console.log(json);
      },
      error => console.log(error)
    );
  }

  broadcastDbChange() {
    this.appCommunicationService.announceDbChange(new Date().toDateString());
  }
}
