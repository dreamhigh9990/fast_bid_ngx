
import { NgModule } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { SocketioService } from './../../shared/services/socketio.service';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbProgressBarModule,
  NbCalendarRangeModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbToggleModule,
  NbCheckboxModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DreamEdgeRoutingModule, routedComponents } from './dreamedge-routing.module';
import { SensorsComponent } from './sensors/sensors.component';
import { AssetsComponent } from './assets/assets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TracktraceComponent } from './tracktrace/tracktrace.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { DetailDialogComponent } from './floorplans/detail-dialog/detail-dialog.component';
import { FsIconComponent } from './sensors/sensors.component';
import { AsIconComponent } from './assets/assets.component';
import { AssetDialogComponent } from './assets/asset-dialog/asset-dialog.component';

@NgModule({
  imports: [
    ThemeModule,
    DreamEdgeRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTreeGridModule,
    NbInputModule,
    NbToggleModule,
    GoogleMapsModule,
    NbSelectModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
    SensorsComponent,
    AssetsComponent,
    DashboardComponent,
    TracktraceComponent,
    DetailDialogComponent,
    FsIconComponent,
    AsIconComponent,
    AssetDialogComponent,
  ],
  providers: [SocketioService],
})
export class DreamEdgeModule { }
