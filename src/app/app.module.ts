import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatIconModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {HttpModule} from '@angular/http';
import {AppService} from './shared/app.service';
import {RouterModule, Routes} from '@angular/router';
import { ReposComponent } from './repos/repos.component';
import { AvatarModule } from 'ngx-avatar';
import {FilterPipe} from './shared/filter.pipe';

const app: Routes = [
  {
    path: 'repos',
    children: [
      {
        path: ':repo',
        component: ReposComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/repos',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReposComponent,
    FilterPipe
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
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    RouterModule.forRoot(app)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
