import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AppService {
  url = 'http://localhost:8000/repos';

  constructor(private http: Http) {}

  getUserInfo() {
    const header = new Headers({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(`${this.url}`, {headers: header});
  }
  getRepos(user: string) {
    const header = new Headers({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/${user}`, {headers: header});
  }
  getRepo(user: string, repo: string) {
    const header = new Headers({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/${user}/${repo}`, {headers: header});
  }
  getRepoLanguageType(user: string, repo: string) {
    const header = new Headers({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/${user}/${repo}/languages`, {headers: header});
  }
}
