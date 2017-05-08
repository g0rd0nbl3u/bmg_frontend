import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppCommunicationService {
  // Observable string sources
  private dbChangeAnnouncementSource = new Subject<string>();
  // Observable string streams
  dbChangeAnnounced$ = this.dbChangeAnnouncementSource.asObservable();
  // Service message commands
  announceDbChange(change: string) {
    this.dbChangeAnnouncementSource.next(change);
  }
}
