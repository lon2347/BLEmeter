import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrantsPageRoutingModule } from './quadrants-routing.module';

import { QuadrantsPage } from './quadrants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrantsPageRoutingModule
  ],
  declarations: [QuadrantsPage]
})
export class QuadrantsPageModule {}
