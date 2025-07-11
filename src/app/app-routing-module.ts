import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrikiStoreMerchandise } from './friki-store-merchandise/friki-store-merchandise';
import { StoreAbout } from './store-about/store-about';

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
  }
  // {
  //   path:'',
  //   redirectTo: 'friki-store/merchandise',
  //   pathMatch:'full'
  // },
  // {
  //   path:'friki-store/merchandise',
  //   component: FrikiStoreMerchandise

  // },
  // {
  //   path:'friki-store/about',
  //   component: StoreAbout
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
