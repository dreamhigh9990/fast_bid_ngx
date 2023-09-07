/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { ResidentService, MedicationService } from '../../shared';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-browse-rx-chart-fileview',
    templateUrl: './browse-rx-chart-files.component.html',
    styleUrls: ['./browse-rx-chart-files.component.scss'],
})

export class BrowseRXChartFilesComponent  implements OnInit {
    @Input() resident: any;
    currentSrc = "";
    currentDate = "";
    currentIndex = 0;
    prevDisabled = false;
    nextDisabled = false;

    constructor(private residentService: ResidentService,
        private dialogRef: NbDialogRef<any>) {
    }

    ngOnInit() {
        this.updateSrc();
    }

    close() {
        this.dialogRef.close();
    }

    showPreviousFile() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSrc();
        }
    }

    updateSrc() {
        if (this.resident['rx_chart_files'].length == 0) {
            return;
        }
        this.currentSrc = environment.rx_chart_base_url + this.resident['rx_chart_files'][this.currentIndex]['rx_chart_file_path'];
        this.currentDate = this.resident['rx_chart_files'][this.currentIndex]['started_date'];
        this.prevDisabled = this.currentIndex == 0;
        this.nextDisabled = this.currentIndex == this.resident['rx_chart_files'].length - 1;
    }

    showNextFile() {
        if (this.currentIndex < this.resident['rx_chart_files'].length - 1) {
            this.currentIndex++;
            this.updateSrc();
        }
    }
}
