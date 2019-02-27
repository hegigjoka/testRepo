import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatProgressSpinnerModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service';
import {RouterModule, Routes} from '@angular/router';
import { ReposComponent } from './repos/repos.component';
import { AvatarModule } from 'ngx-avatar';

const app: Routes = [
  {
    path: '',
    children: [
      {
        path: 'repos',
        component: ReposComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReposComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    AvatarModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterModule.forRoot(app)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
