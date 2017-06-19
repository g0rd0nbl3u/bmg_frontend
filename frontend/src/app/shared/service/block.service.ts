import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppCommunicationService} from './appCommunication.service';

@Injectable()
export class BlockService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private blockUrl = 'http://bmg_backend:3000/block';  // URL to web api
  constructor(private http: Http,
              private appCommunicationService: AppCommunicationService) {
  }

  getAllBlocks(): Promise<Object[]> {
    return this.http.get(`${this.blockUrl}/getAll`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getBlock(id: string): Promise<Object> {
    const url = `${this.blockUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }

  getBlocksForKnowledge(id: string): Promise<Array<Object>> {
    const url = `${this.blockUrl}/getForKnowledge/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }




  delete(id: number): Promise<void> {
    const url = `${this.blockUrl}/delete/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceBlockChanged(new Date().toDateString());
        return null;
      })
      .catch(this.handleError);

  }

  add(block: Object): Promise<Object> {
    const url = `${this.blockUrl}/add`;
    return this.http
   .post(url, JSON.stringify(block), {headers: this.headers})
   .toPromise()
   .then(res => res.json().data)
   .catch(this.handleError);
   }

  update(id: string, block: Object): Promise<Object> {
    const url = `${this.blockUrl}/update/${id}`;
    return this.http
      .put(url, JSON.stringify(block), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceBlockChanged(new Date().toDateString());
        return block;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
