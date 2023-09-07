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

import { Component, Input } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { MedicationService, ResidentService } from '../../shared';
import { NbDialogService } from '@nebular/theme';
import { MedicationDetailComponent } from './medication-detail.component';
import { CreateMedicationComponent } from './create-medication.component';
import { BrowseRXChartFilesComponent } from './browse-rx-chart-files.component';
import { ActivatedRoute } from '@angular/router';

const MEDICATION_STATUS = [
    'Started',
    'Scanned RX Chart',
    'Uploaded to Medscom',
    'Medication Dispatched',
    'Medication Received',
    'Updated LeeCare'
];
@Component({
    selector: 'app-medication-view',
    templateUrl: './medication.component.html',
    styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent {
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            medications_id: {
                title: 'ID',
                width: '10%',
            },
            residents_name: {
                title: 'Resident Name',
                width: '20%',
            },
            medication_text: {
                title: 'Medicine',
                width: '30%',
            },
            status: {
                title: 'Status',
                width: '20%',
            },
            started_date: {
                title: 'Started',
                width: '10%',
                filter: false,
            },
            ended_date: {
                title: 'Ended',
                width: '10%',
                filter: false,
            }
        },
    };
    source: ServerDataSource;
    residentsId: string = '0';
    status: string = '';
    showNewButton: boolean = true;
    showRXChartButton: boolean = false;

    constructor(protected medicationService: MedicationService, protected residentService: ResidentService, public http: HttpClient, private dialogService: NbDialogService, private route:ActivatedRoute) {
        const link = this.medicationService.getLinkForMedications("0");
        this.source = new ServerDataSource(this.http, { endPoint: link });
    }

    @Input() set residents_id(residents_id) {
        const link = this.medicationService.getLinkForMedications(residents_id);
        this.source = new ServerDataSource(this.http, { endPoint: link });
        this.residentsId = residents_id;
        this.showNewButton = false;
        this.showRXChartButton = true;
    }

    ngOnInit() {
        this.route.paramMap.subscribe( paramMap => {
            this.status = paramMap.get('status');
            if (this.status != null) {
                this.showNewButton = false;
                if (this.status == "running") {
                    const link = this.medicationService.getLinkForRunningMedications();
                    this.source = new ServerDataSource(this.http, { endPoint: link });
                    return;
                } else if (this.status == 'overdue') {
                    const link = this.medicationService.getLinkForOverdueMedications();
                    this.source = new ServerDataSource(this.http, { endPoint: link });
                    return;
                }
                this.source.setFilter([{field: 'status', search: MEDICATION_STATUS[this.status]}]);
            }
        })
    }

    createNewProcess() {
        this.dialogService.open(CreateMedicationComponent, {
            context: {
            },
        }).onClose.subscribe(_ => {
            this.source.refresh();
        });
    }

    onSelectMedication(event) {
        this.residentService.getResidentDetail(event.data.residents_id).then((result) => {
            this.dialogService.open(MedicationDetailComponent, {
                context: {
                    medication: event.data,
                    resident: result['residents_detail'],
                },
            }).onClose.subscribe(_ => {
                this.source.refresh();
            });
        });
    }

    showRXChartFiles() {
        this.residentService.getResidentDetail(this.residentsId).then((result) => {
            this.dialogService.open(BrowseRXChartFilesComponent, {
                context: {
                    resident: result['residents_detail'],
                },
            });
        });
    }
}
