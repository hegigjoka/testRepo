import {Component, OnInit} from '@angular/core';
import {AppService} from './shared/app.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  user: any;

  repos: any[];
  likedRepos: boolean;

  constructor(private app: AppService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (window.location.href.match(/\/repos/)) {
      this.isLogged = true;
      this.getUserInf();
      setTimeout(() => {
        this.getRepositories();
      }, 600);
    }
  }

  getUserInf() {
    this.app.getUserInfo().subscribe((response) => {
      localStorage.setItem('user', response.json().data.login);
      localStorage.setItem('token', response.json().token);
      this.user = response.json().data;
    });
  }

  getRepositories() {
    this.app.getRepos(localStorage.getItem('user')).subscribe((response) => {
      this.repos = response.json().data;
      this.likedRepos = true;
    });
  }

  openRepo(repo: string) {
    this.router.navigate(['/repos', repo]);
  }

  signIn() {
    window.open('https://github.com/login/oauth/authorize?client_id=efaabbebfc9582091a2d');
  }
}
