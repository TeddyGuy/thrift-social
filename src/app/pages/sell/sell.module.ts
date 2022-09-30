import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import { IonicModule } from '@ionic/angular';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';
import { TextInputComponent } from 'src/app/components/form/input/text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    ReactiveFormsModule,
    SellPageRoutingModule
  ],
  declarations: [SellPage, TextInputComponent]
})
export class SellPageModule {}
