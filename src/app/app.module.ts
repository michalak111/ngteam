import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ApplicationComponent } from './application/application.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { TeamService } from './services/team.service';
import { TeamUserCardComponent } from './team-user-card/team-user-card.component';
import { AuthRedirectComponent } from './auth-redirect/AuthRedirectComponent';
import { ChangeStatusComponent } from './change-status/change-status.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app', component: ApplicationComponent, canActivate: [AuthGuardService] },
  { path: 'app/profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'app/profile/edit', component: ProfileFormComponent, canActivate: [AuthGuardService] },
  { path: 'app/team', component: TeamComponent, canActivate: [AuthGuardService] },
  { path: 'app/change-status', component: ChangeStatusComponent, canActivate: [AuthGuardService] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileFormComponent,
    ApplicationComponent,
    ProfileComponent,
    TeamComponent,
    TeamUserCardComponent,
    AuthRedirectComponent,
    ChangeStatusComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    UserService,
    AuthGuardService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
