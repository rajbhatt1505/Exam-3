import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './component/main/main.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './component/user/user.component';
import { UserdataComponent } from './component/userdata/userdata.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { UserupdateComponent } from './component/userupdate/userupdate.component';
import { HomeComponent } from './component/home/home.component';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import { IntercepterService } from './service/intercepter.service';
import { AuthGuard } from './service/auth.guard';
import { AudioComponent } from './component/audio/audio.component';
import { AudiodataComponent } from './component/audiodata/audiodata.component';
import { AudioupdateComponent } from './component/audioupdate/audioupdate.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProfileComponent,
    UserComponent,
    UserdataComponent,
    UserupdateComponent,
    HomeComponent,
    AudioComponent,
    AudiodataComponent,
    AudioupdateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    
  
    

  ],
  providers: [CookieService,TokenService,
    AuthService,AuthGuard
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
