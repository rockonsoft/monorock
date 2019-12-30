import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';

import { LoginComponent } from './components/login/login.component';

import { FirebaseUIModule } from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { RbacTestComponent } from './rbac-test/rbac-test.component';
import { SuperUserComponent } from './components/super-user/super-user.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AdminModule } from './admin/admin.module';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/',
  privacyPolicyUrl: '/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [AppComponent, LandingComponent, LoginComponent, RbacTestComponent, SuperUserComponent],
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    PanelModule,
    TableModule,
    DropdownModule,
    ProgressBarModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'rockme'),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule,
    AppRoutingModule,
    AuthModule,
    AdminModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
