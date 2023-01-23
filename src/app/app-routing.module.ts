import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './component/user/user.component';
import { UserdataComponent } from './component/userdata/userdata.component';
import { UserupdateComponent } from './component/userupdate/userupdate.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  { path: '',component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: 'main', component: MainComponent,canActivate:[AuthGuard], children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'user', component: UserComponent, pathMatch: 'full' },
      { path: 'userdata', component: UserdataComponent },
      { path: 'userupdate/:id', component: UserupdateComponent },
      {path:'home',component:HomeComponent}

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
