import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuadrantsPage } from './quadrants.page';

const routes: Routes = [
  {
    path: '',
    component: QuadrantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuadrantsPageRoutingModule {}
