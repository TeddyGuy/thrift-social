import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import { IonicModule } from '@ionic/angular';

import { SearchSalePageRoutingModule } from './search-sale-routing.module';

import { SearchSalePage } from './search-sale.page';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    IonicModule,
    SearchSalePageRoutingModule
  ],
  declarations: [SearchSalePage]
})
export class SearchSalePageModule {}
