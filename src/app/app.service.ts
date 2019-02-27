import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AppService {
  url = 'http://localhost:8000/repos';

  constructor(private http: Http) {}

  getUserInfo() {
    return this.http.get(`${this.url}`);
  }
}
