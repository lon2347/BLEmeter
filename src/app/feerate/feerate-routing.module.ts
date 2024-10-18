import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeratePage } from './feerate.page';

const routes: Routes = [
  {
    path: '',
    component: FeeratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeratePageRoutingModule {}
