import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions, ConnectionBackend } from '@angular/http';

import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2SocialLoginModule } from "angular2-social-login";

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { ApiService } from './services/api-service/api.service';
import { AuthService } from './services/auth-service/auth.service';
import { UserProfileService } from './components/views/start/user-profile.service';
import { UserService } from './services/user-service/user.service';
import { TaskService } from './services/task-service/task.service';
import { HttpInterceptor } from './services/http-interceptor/http-interceptor';
import { ImageCropperComponent } from 'ng2-img-cropper';

/**
* Bootstrap Modules - Start
*/
import { CarouselModule } from './components/vendor/carousel/carousel.module';
import { LoginComponent } from './components/views/login/login.component';
import { routing } from './routes/app.routing';
import { AuthGuard } from './guards/auth-guard';
import { SignupComponent } from './components/views/signup/signup.component';
import { StartComponent } from './components/views/start/start.component';
import { ProfileCoverComponent } from './components/common/profile-cover/profile-cover.component';
import { ProfileAvatarComponent } from './components/common/profile-avatar/profile-avatar.component';
import { ProfileDetailsComponent } from './components/common/profile-details/profile-details.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { PanelModalComponent } from './components/common/panel-modal/panel-modal.component';
import { CreateTaskComponent } from './components/partials/create-task/create-task.component';
import { TasksComponent } from './components/common/tasks/tasks.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/*const appRoutes: Routes = [
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'crisis-center', component: CrisisListComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: {
      title: 'Heroes List'
    }
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];*/

let providers = {
    "google": {
      "clientId": "856923517509-v0ni54imi5ovffjf4825rspecb3qtjs6.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "316460475454817",
      "apiVersion": "v2.9"
    }
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    StartComponent,
    ProfileDetailsComponent,
    ProfileCoverComponent,
    ProfileAvatarComponent,
    LoaderComponent,
    PanelModalComponent,
    CreateTaskComponent,
    ImageCropperComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarouselModule,
    routing,
    BrowserAnimationsModule,
    Angular2SocialLoginModule,
    NgbModule.forRoot()
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TaskService,
    AuthService,
    AuthGuard,
    ApiService,
    UserService,
    UserProfileService,
    HttpInterceptor,
    {
      provide: HttpInterceptor,
      useFactory:
        (backend: XHRBackend, defaultOptions: RequestOptions,router: Router) => {
        return new HttpInterceptor(backend, defaultOptions, router);
      },
      deps: [ XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);