import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppCommunicationService} from './appCommunication.service';

@Injectable()
export class CfConfigService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private blockUrl = 'http://localhost:3000/cf_config';  // URL to web api
  constructor(private http: Http,
              private appCommunicationService: AppCommunicationService) {
  }

  getAll(): Promise<Object[]> {
    return this.http.get(`${this.blockUrl}/getAll`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  get(id: string): Promise<Object> {
    const url = `${this.blockUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }

  deleteConfig(id: number): Promise<void> {
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
