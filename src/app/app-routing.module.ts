import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sensor',
    loadChildren: () => import('./sensor/sensor.module').then( m => m.SensorPageModule)
  },
  {
    path: 'value',
    loadChildren: () => import('./value/value.module').then( m => m.ValuePageModule)
  },
  {
    path: 'current',
    loadChildren: () => import('./current/current.module').then( m => m.CurrentPageModule)
  },
  {
    path: 'load',
    loadChildren: () => import('./load/load.module').then( m => m.LoadPageModule)
  },
  {
    path: 'power',
    loadChildren: () => import('./power/power.module').then( m => m.PowerPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'energy',
    loadChildren: () => import('./energy/energy.module').then( m => m.EnergyPageModule)
  },
  {
    path: 'feerate',
    loadChildren: () => import('./feerate/feerate.module').then( m => m.FeeratePageModule)
  },
  {
    path: 'needs',
    loadChildren: () => import('./needs/needs.module').then( m => m.NeedsPageModule)
  },
  {
    path: 'quadrants',
    loadChildren: () => import('./quadrants/quadrants.module').then( m => m.QuadrantsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
