import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './component/add-book/add-book.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { BooksListComponent } from './component/books-list/books-list.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './component/user/user.component';
import { UserdataComponent } from './component/userdata/userdata.component';
import { UserupdateComponent } from './component/userupdate/userupdate.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'main',component:MainComponent,children:[
    {path:'profile',component:ProfileComponent},
    {path:'user',component:UserComponent},
    {path:'userdata',component:UserdataComponent},
    {path:'userupdate',component:UserupdateComponent},
    {path:'books-list',component:BooksListComponent},
    { path:'add-book', component:AddBookComponent},
    {path:'edit-book/:id', component:BookDetailComponent},


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
