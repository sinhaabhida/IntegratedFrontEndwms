import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import{FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './routes';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr'
import { AuthGuard, LoginGuard } from './auth/auth.guard';
import { ManageUsersComponent } from './dashboard/manage-users/manage-users.component';
import { CreateUserComponent } from './dashboard/manage-users/create-user/create-user.component';
import { EditUserComponent } from './dashboard/manage-users/edit-user/edit-user.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TaskComponent } from './dashboard/task/task.component';
import { NewTaskComponent } from './dashboard/task/new-task/new-task.component';
import { TaskService } from './shared/task.service';
import { EditTaskComponent } from './dashboard/task/edit-task/edit-task.component';
import { MyViewComponent } from './dashboard/my-view/my-view.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    DashboardComponent,
    ManageUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    ProfileComponent,
    TaskComponent,
    NewTaskComponent,
    EditTaskComponent,
    MyViewComponent
  ],
  imports: [
    BrowserModule,
  RouterModule.forRoot(appRoutes),
  FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService,AuthGuard,LoginGuard,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
