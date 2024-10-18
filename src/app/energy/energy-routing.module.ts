import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergyPage } from './energy.page';

const routes: Routes = [
  {
    path: '',
    component: EnergyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergyPageRoutingModule {}
