import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbRadioModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ResourcesRoutingModule, routedComponents } from './resources-routing.module';
import { TemplateDialogComponent } from './templates/template-dialog.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    ResourcesRoutingModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbRadioModule,
    FormsModule,
  ],
  declarations: [
    ...routedComponents,
    TemplateDialogComponent,
  ],
})
export class ResourcesModule { }
