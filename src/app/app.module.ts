/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { environment } from '../environments/environment';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
} from '@nebular/theme';

import {
  ApiService,
  AuthGuard,
  NoAuthGuard,
  JwtService,
  SharedModule,
  AdminUserService,
  ValidationService,
} from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.api_url,
          login: {
            endpoint: '/admin_user/sign_in',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
            requireValidToken: true,
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
          },
          register: {
            endpoint: '/admin_user/sign_up',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500,
          rememberMe: false,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    ApiService,
    AuthGuard,
    NoAuthGuard,
    JwtService,
    AdminUserService,
  ],
})
export class AppModule {
}
