import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { patch } from 'webdriver-js-extender';
import { AuthGuard, LoginGuard } from './auth/auth.guard';
import { ManageUsersComponent } from './dashboard/manage-users/manage-users.component';
import { CreateUserComponent } from './dashboard/manage-users/create-user/create-user.component';
import { EditUserComponent } from './dashboard/manage-users/edit-user/edit-user.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TaskComponent } from './dashboard/task/task.component';
import { NewTaskComponent } from './dashboard/task/new-task/new-task.component';
import { EditTaskComponent } from './dashboard/task/edit-task/edit-task.component';
import { MyViewComponent } from './dashboard/my-view/my-view.component';
export const appRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [{ path: 'users', component: ManageUsersComponent },
        { path: 'create_users', component: CreateUserComponent },
        { path: 'edit_user/:id', component: EditUserComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'tasks', component: TaskComponent },
        { path: 'home', component: MyViewComponent },
        { path: 'new_task', component: NewTaskComponent },
        { path: 'edit_task/:id', component: EditTaskComponent }
        ]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }],
        canActivate: [LoginGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/login', pathMatch: 'full'
    }
];