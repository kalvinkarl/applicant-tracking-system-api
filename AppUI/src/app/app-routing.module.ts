import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { EvaluatorComponent } from './components/evaluator/evaluator.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user/verify/:id/:uniqueString', component: VerifyComponent },
  { path: 'admin', component: AdminComponent, 
    children: [
      { path: "general", component: AdminComponent },
      { path: "sample", component: AdminComponent },
    ], canActivate: [AuthGuard] },
  { path: 'user', component: ApplicantComponent },
  { path: 'evaluate', component: EvaluatorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
