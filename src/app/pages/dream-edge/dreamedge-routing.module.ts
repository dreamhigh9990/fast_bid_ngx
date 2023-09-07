import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DreamEdgeComponent } from './dreamedge.component';
import { FloorplansComponent } from './floorplans/floorplans.component';
import { SensorsComponent } from './sensors/sensors.component';
import { AssetsComponent } from './assets/assets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TracktraceComponent } from './tracktrace/tracktrace.component';

import { ThemeModule } from '../../@theme/theme.module';

const routes: Routes = [{
  path: '',
  component: DreamEdgeComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },{
    path: 'floorplans',
    component: FloorplansComponent,
  },{
    path: 'sensors',
    component: SensorsComponent,
  },{
    path: 'assets',
    component: AssetsComponent,
  },{
    path: 'track-trace',
    component: TracktraceComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes), ThemeModule],
  exports: [RouterModule],
})
export class DreamEdgeRoutingModule { }

export const routedComponents = [
  DreamEdgeComponent,
  FloorplansComponent,
  DashboardComponent,
  SensorsComponent,
  AssetsComponent,
  TracktraceComponent,
];
