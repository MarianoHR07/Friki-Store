import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './product-list/product-list';

import { FormsModule } from '@angular/forms';
import { StoreAbout } from './store-about/store-about';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { FrikiStoreMerchandise } from './friki-store-merchandise/friki-store-merchandise';
@NgModule({
  declarations: [
    App,
    ProductList,
    StoreAbout,
    ShoppingCart,
    FrikiStoreMerchandise
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
