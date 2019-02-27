import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthServive {
  url = '';

  constructor(private http: HttpClient) {}


}
