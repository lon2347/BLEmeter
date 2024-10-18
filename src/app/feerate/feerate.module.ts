import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeratePageRoutingModule } from './feerate-routing.module';

import { FeeratePage } from './feerate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeratePageRoutingModule
  ],
  declarations: [FeeratePage]
})
export class FeeratePageModule {}
