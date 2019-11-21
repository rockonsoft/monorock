import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './routing/routing.module';

import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';

//prime-ng
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    ButtonModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'rockme'),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    RouterModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
