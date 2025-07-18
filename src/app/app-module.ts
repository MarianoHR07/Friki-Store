import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './product-list/product-list';

import { FormsModule } from '@angular/forms';
import { StoreAbout } from './store-about/store-about';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { FrikiStoreMerchandise } from './friki-store-merchandise/friki-store-merchandise';
import { InputCounter } from './input-counter/input-counter';

import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    ProductList,
    StoreAbout,
    ShoppingCart,
    FrikiStoreMerchandise,
    InputCounter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
