import {Component} from '@angular/core';
import {UploadService} from '../shared/service/upload.service';

@Component({
  selector: 'app-uploadview',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UploadService]
})
export class UploadComponent {
  title = 'Upload-Component';

  constructor(private uploadService: UploadService) {
  }

  onSelectKnowledge(file) {
    this.uploadService.upload(file[0], 'upload/knowledge').subscribe(
      json => console.log(json),
      error => console.log(error)
    );
  }

  onSelectProduct(file) {
    this.uploadService.upload(file[0], 'upload/product').subscribe(
      json => console.log(json),
      error => console.log(error)
    );
  }
}
