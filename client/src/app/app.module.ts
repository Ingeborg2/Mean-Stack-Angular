import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { HttpModule, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { GemstonesComponent } from './components/gems/gemstones/gemstones.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { AuthService } from './services/auth.service';
import { GemsService } from './services/gems.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AddGemsComponent } from './components/gems/add-gems/add-gems.component';
import { DeleteGemsComponent } from './components/gems/delete-gems/delete-gems.component';
import { EditGemsComponent } from './components/gems/edit-gems/edit-gems.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GemstonesComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AddGemsComponent,
    DeleteGemsComponent,
    EditGemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    HttpModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    GemsService,
    AuthGuard,
    NotAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
