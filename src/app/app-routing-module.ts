import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrikiStoreMerchandise } from './friki-store-merchandise/friki-store-merchandise';
import { StoreAbout } from './store-about/store-about';
import { SignUp } from './sign-up/sign-up';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'merchandise',
    pathMatch:'full'
  },
  {
    path:'merchandise',
    component: FrikiStoreMerchandise
  },
  {
    path:'about',
    component: StoreAbout
  },
  {
    path:'sign-up',
    component: SignUp
  },
  {
    path:'login',
    component:SignUp
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
