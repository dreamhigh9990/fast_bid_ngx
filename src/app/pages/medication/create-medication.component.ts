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
import { ResidentService, MedicationService } from '../../shared';
import { NbToastrService, NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-create-medication-view',
    templateUrl: './create-medication.component.html',
    styleUrls: ['./create-medication.component.scss'],
})

export class CreateMedicationComponent  implements OnInit {
    residents = [];
    selectedResident = -1;
    medicationDetail = "";

    constructor(private residentService: ResidentService, 
        private medicationService: MedicationService, 
        private dialogRef: NbDialogRef<any>, 
        private toastrService: NbToastrService) {
    }

    ngOnInit() {
        this.residentService.getResidents().then(data => {
            this.residents = data;
        });
    }

    createMedication() {
        if (this.selectedResident < 0 || this.medicationDetail == "") {
            this.toastrService.show("Please select the resident and input the medication detail.", "Error", {status: 'danger'});
            return;
        }
        this.medicationService.addNewMedication(this.residents[this.selectedResident].residents_id, this.medicationDetail).then(result => {
            if (result['status'] == 200) {
                this.toastrService.show(result['message'], "Success", {status: 'success'});
                this.dialogRef.close();
            } else {
                this.toastrService.show(result['message'], "Error", {status: 'danger'});
            }
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}
