import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  user: any;

  constructor(private app: AppService) {}

  ngOnInit() {
    if (window.location.href.match(/\/repos/)) {
      this.isLogged = true;
      this.getUserInf();
    }
  }

  getUserInf() {
    this.app.getUserInfo().subscribe((response) => {
      this.user = response.json().data;
      console.log(this.user);
    });
  }

  signIn() {
    window.open('https://github.com/login/oauth/authorize?client_id=efaabbebfc9582091a2d');
  }
}
