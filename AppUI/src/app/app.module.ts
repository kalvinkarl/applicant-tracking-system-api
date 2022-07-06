import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/home/signin/signin.component';
import { SignupComponent } from './components/home/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ApplicantsComponent } from './components/admin/applicants/applicants.component';
import { GeneralComponent } from './components/admin/general/general.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    VerifyComponent,
    AdminComponent,
    ApplicantComponent,
    EvaluatorComponent,
    ProfileComponent,
    ApplicantsComponent,
    GeneralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
