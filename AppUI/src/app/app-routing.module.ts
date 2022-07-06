import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
  ]},
  { path: 'admin', component: AdminComponent, 
    children: [
      { path: "applicants", component: ApplicantsComponent },
      { path: "general", component: GeneralComponent },
      { path: 'profile', component: ProfileComponent},
    ], canActivate: [RoleGuard, AuthGuard] },
  { path: 'user', component: ApplicantComponent, canActivate: [RoleGuard, AuthGuard] },
  { path: 'evaluate', component: EvaluatorComponent, canActivate: [RoleGuard, AuthGuard] },
  { path: 'user/verify/:id/:uniqueString', component: VerifyComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
