import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GemstonesComponent } from './components/gems/gemstones/gemstones.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AddGemsComponent } from './components/gems/add-gems/add-gems.component';
import { DeleteGemsComponent } from './components/gems/delete-gems/delete-gems.component';
import { EditGemsComponent } from './components/gems/edit-gems/edit-gems.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'gemstones', component: GemstonesComponent, canActivate: [AuthGuard]  }, // User must be logged in to view this route
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]  }, // User must be logged out to view this route
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]  },
    { path: 'addGem', component: AddGemsComponent, canActivate: [AuthGuard]  },
    { path: 'deleteGem/:id', component: DeleteGemsComponent, canActivate: [AuthGuard] },
    { path: 'updateGem/:id', component: EditGemsComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent }    // For when non-existing routes are typed in in url.
                                                // put this always last in the row of paths.
];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }