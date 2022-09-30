import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysalesPageRoutingModule } from './mysales-routing.module';

import { MysalesPage } from './mysales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysalesPageRoutingModule
  ],
  declarations: [MysalesPage]
})
export class MysalesPageModule {}
