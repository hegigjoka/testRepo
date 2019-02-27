import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  userInfo: any;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.app.getUserInfo().subscribe((response) => {
      this.userInfo = response.json().data;
      console.log(this.userInfo);
    });
  }

}
