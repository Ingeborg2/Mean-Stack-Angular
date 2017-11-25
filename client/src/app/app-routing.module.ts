import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]  },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]  },
    { path: '**', component: HomeComponent }    // For when non-existing routes are typed in in url.
                                                // put this always last in the row of paths.
];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }