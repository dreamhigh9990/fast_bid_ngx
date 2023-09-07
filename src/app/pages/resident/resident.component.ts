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

import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { MedicationComponent } from '../medication/medication.component';
@Component({
    selector: 'app-resident-view',
    templateUrl: './resident.component.html',
    styleUrls: ['./resident.component.scss'],
})
export class ResidentComponent implements OnInit {
    fileToUpload: File | null = null;

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            residents_id: {
                title: 'ID',
                width: '15%',
            },
            code: {
                title: 'Code',
                width: '20%',
            },
            name: {
                title: 'Name',
                width: '30%',
            },
            dob: {
                title: 'D.O.B',
                width: '20%',
                filter: false,
            },
            room: {
                title: 'Room',
                width: '15%',
                filter: false,
            },
        },
    };
    source: ServerDataSource;

    constructor(private service: ResidentService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = service.getLinkForResidents();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    ngOnInit() {
    }

    onSelectResident(event) {

        this.dialogService.open(MedicationComponent, {
            context: {
              residents_id: event.data.residents_id
            },
          });
    }

    handleFileInput(event) {
        this.fileToUpload = (<HTMLInputElement>event.target).files.item(0);
        this.uploadCSV();
    }

    uploadCSV() {
        if (!this.fileToUpload)
            return;
        this.service.uploadCSV(this.fileToUpload).then(_ => {
            const link = this.service.getLinkForResidents();
            this.source = new ServerDataSource(this.http, { endPoint: link });
            alert('Successfully Uploaded!');
        }, error => {

        });
    }
}
