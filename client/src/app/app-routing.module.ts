import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GemstonesComponent } from './components/gemstones/gemstones.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AddGemsComponent } from './components/add-gems/add-gems.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'gemstones', component: GemstonesComponent, canActivate: [AuthGuard]  },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]  },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]  },
    { path: 'addGem', component: AddGemsComponent, canActivate: [AuthGuard]  },
    { path: '**', component: HomeComponent }    // For when non-existing routes are typed in in url.
                                                // put this always last in the row of paths.
];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }