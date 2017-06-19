import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppCommunicationService} from "./appCommunication.service";

@Injectable()
export class KnowledgeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private knowledgeUrl = 'http://bmg_backend:3000/knowledge';  // URL to web api
  constructor(private http: Http,
              private appCommunicationService: AppCommunicationService) {
  }

  getAllKnowledge(): Promise<Object[]> {
    return this.http.get(`${this.knowledgeUrl}/getAll`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getKnowledge(id: string): Promise<Object> {
    const url = `${this.knowledgeUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json() as Object;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.knowledgeUrl}/delete/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceDbChange(new Date().toDateString());
        return null;
      })
      .catch(this.handleError);

  }

  /*create(name: string): Promise<Knowledge> {
   return this.http
   .post(this.knowledgeUrl, JSON.stringify({name: name}), {headers: this.headers})
   .toPromise()
   .then(res => res.json().data as Knowledge)
   .catch(this.handleError);
   }*/

  update(id: string, knowledge: Object): Promise<Object> {
    const url = `${this.knowledgeUrl}/update/${id}`;
    console.log('KnowledgeArray Before transmitting:');
    console.log(knowledge);
    return this.http
      .put(url, JSON.stringify(knowledge), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.appCommunicationService.announceDbChange(new Date().toDateString());
        return knowledge;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
