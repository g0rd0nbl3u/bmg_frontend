import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private productUrl = 'http://localhost:3000/product';  // URL to web api
  constructor(private http: Http) {
  }

  getAllProduct(): Promise<Object[]> {
    return this.http.get(`${this.productUrl}/getAll`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProduct(id: string): Promise<Object> {
    const url = `${this.productUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json() as Object;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.productUrl}/delete/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  /*create(name: string): Promise<Product> {
   return this.http
   .post(this.productUrl, JSON.stringify({name: name}), {headers: this.headers})
   .toPromise()
   .then(res => res.json().data as Product)
   .catch(this.handleError);
   }*/

  update(id: string, product: Object): Promise<Object> {
    const url = `${this.productUrl}/update/${id}`;
    console.log('ProductArray Before transmitting:');
    console.log(product);
    return this.http
      .put(url, JSON.stringify(product), {headers: this.headers})
      .toPromise()
      .then(() => product)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
