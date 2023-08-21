import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {LoginComponent} from "./page/login/login.component";
import {UserEditComponent} from "./page/user-edit/user-edit.component";
import {UsersComponent} from "./page/users/users.component";
import {ForbiddenComponent} from "./page/forbidden/forbidden.component";
import {authGuard} from "./guard/auth.guard";
// import {AuthGuardService} from "./service/auth-guard.service";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  // all the other urls
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
