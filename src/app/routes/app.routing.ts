import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/views/login/login.component';
import { SignupComponent } from '../components/views/signup/signup.component';
import { StartComponent } from '../components/views/start/start.component';
import { PageNotFoundComponent } from '../components/views/page-not-found/page-not-found.component';
import { AuthGuard } from '../guards/auth-guard';

const appRoutes: Routes = [
    { path: '', component: StartComponent,canActivate: [AuthGuard] },
    { path: 'start', component: StartComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  	{ path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);