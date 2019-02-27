import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos: any;
  reposLang: any;
  objectifyReposLang = [];
  objectifyLangUsage: number;

  constructor(private app: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('repo');
    this.route.params.subscribe((repo: Params) => {
      this.app.getRepo(localStorage.getItem('user'), repo['repo']).subscribe((response) => {
        this.repos = response.json().data;
      });
      this.app.getRepoLanguageType(localStorage.getItem('user'), repo['repo']).subscribe((response) => {
        this.reposLang = response.json().data;
        let tot = 0;
        Object.keys(this.reposLang).forEach((value) => {
          console.log({name: value, usage: this.reposLang[value]});
          this.objectifyReposLang.push({name: value, usage: this.reposLang[value]});
          tot += this.reposLang[value];
        });
        this.objectifyLangUsage = tot;
      });
    });
  }
}
