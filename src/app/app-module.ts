import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './product-list/product-list';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreAbout } from './store-about/store-about';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { FrikiStoreMerchandise } from './friki-store-merchandise/friki-store-merchandise';
import { InputCounter } from './input-counter/input-counter';

import { HttpClientModule} from '@angular/common/http';
import { SignUp } from './sign-up/sign-up';
import { LogIn } from './log-in/log-in';

@NgModule({
  declarations: [
    App,
    ProductList,
    StoreAbout,
    ShoppingCart,
    FrikiStoreMerchandise,
    InputCounter,
    SignUp,
    LogIn
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
