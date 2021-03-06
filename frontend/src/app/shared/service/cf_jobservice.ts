import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppCommunicationService} from './appCommunication.service';

@Injectable()
export class CFJobService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private cfUrl = 'https://api.crowdflower.com/v1';  // URL to web api
  constructor(private http: Http,
              private appCommunicationService: AppCommunicationService) {
  }

  getAllJobs(key): Promise<Object[]> {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'text/csv'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.cfUrl}/jobs.json?key{` + key + `}`, options)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  /*
  getBlock(id: string): Promise<Object> {
    const url = `${this.cfUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }

  getBlocksForKnowledge(id: string): Promise<Array<Object>> {
    const url = `${this.cfUrl}/getForKnowledge/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }




  delete(id: number): Promise<void> {
    const url = `${this.cfUrl}/delete/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceBlockChanged(new Date().toDateString());
        return null;
      })
      .catch(this.handleError);

  }

  add(block: Object): Promise<Object> {
    const url = `${this.cfUrl}/add`;
    return this.http
      .post(url, JSON.stringify(block), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(id: string, block: Object): Promise<Object> {
    const url = `${this.cfUrl}/update/${id}`;
    return this.http
      .put(url, JSON.stringify(block), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceBlockChanged(new Date().toDateString());
        return block;
      })
      .catch(this.handleError);
  }
  */

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
