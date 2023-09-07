import { NgModule } from '@angular/core';
import {
  NbMenuModule, NbCardModule, NbStepperModule, NbButtonModule, NbSelectModule, NbInputModule, NbDialogService, NbToastrModule, NbToastrService, NbCheckboxModule, NbRadioModule, NbAccordionModule, NbIconModule, NbFormFieldModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ResidentComponent } from './resident/resident.component';
import { MedicationComponent } from './medication/medication.component';
import { MedicationDetailComponent } from './medication/medication-detail.component';
import { CreateMedicationComponent } from './medication/create-medication.component';
import { BrowseRXChartFilesComponent } from './medication/browse-rx-chart-files.component';
import { ResidentService, MedicationService, AssetService, FloorplanService, BidService, AccountsService, TemplatesService, MessagesService } from '../shared/';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MybidComponent } from './mybid/mybid.component';
// import { FloorplansComponent } from './dream-edge/floorplans/floorplans.component';
import { BidHistoryComponent } from './history/history.component';
import { AccountsComponent } from './accounts/accounts.component';
import { JobsComponent } from './jobs/jobs.component';
import { MessagesComponent } from './messages/messages.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    ECommerceModule,
    MiscellaneousModule,
    NbRadioModule,
    Ng2SmartTableModule,
    FormsModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbToastrModule.forRoot(),
    PdfViewerModule,
  ],
  declarations: [
    PagesComponent,
    ResidentComponent,
    MedicationComponent,
    MedicationDetailComponent,
    CreateMedicationComponent,
    BrowseRXChartFilesComponent,
    MybidComponent,
    // FloorplansComponent,
    BidHistoryComponent,
    AccountsComponent,
    JobsComponent,
    MessagesComponent,
  ],
  providers: [
    ResidentService,
    MedicationService,
    NbDialogService,
    NbToastrService,
    AssetService,
    FloorplanService,
    BidService,
    AccountsService,
    TemplatesService,
    // JobsService,
    MessagesService,
  ],
})
export class PagesModule {
}
