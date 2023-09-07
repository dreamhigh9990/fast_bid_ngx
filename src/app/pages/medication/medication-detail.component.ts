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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MedicationService } from '../../shared';
import { NbStepperComponent, NbToastrService, NbDialogRef } from '@nebular/theme';
import { environment } from '../../../environments/environment';

const MEDICATION_STATUS = {
    'Started': 0,
    'Scanned RX Chart': 1,
    'Uploaded to Medscom': 2,
    'Medication Dispatched': 3,
    'Medication Received': 4,
    'Updated LeeCare': 5
};

@Component({
    selector: 'app-medication-detail-view',
    templateUrl: './medication-detail.component.html',
    styleUrls: ['./medication-detail.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})

export class MedicationDetailComponent  implements OnInit {

    @Input() medication: any;
    @Input() resident: any;
    @ViewChild('stepper') stepper: NbStepperComponent;
    stepperIndex: number = 0;
    nurseName: string = "";

    fileToUpload: File | null = null;

    constructor(private medicationService: MedicationService, 
        private toastrService: NbToastrService, 
        private dialogRef: NbDialogRef<any>) {
    }

    ngOnInit() {
        this.medication['status'] = MEDICATION_STATUS[this.medication['status']];
        this.stepperIndex = this.medication['status'];
    }

    handleFileInput(event) {
        this.fileToUpload = (<HTMLInputElement>event.target).files.item(0);
        this.uploadCSV();
    }

    uploadCSV() {
        if (!this.fileToUpload)
            return;
        
        this.updateMedication('Scanned RX Chart', this.fileToUpload);
    }

    openMedscomUrl() {
        window.open(environment.medscom_url, "_blank");
    }

    openLeecareUrl() {
        window.open(environment.leecare_url, "_blank");
    }

    completeUploadMedscom() {
        this.updateMedication('Uploaded to Medscom');
    }

    completeMedicationDispatch() {
        this.updateMedication('Medication Dispatched');
    }

    completeMedicationReceive() {
        this.updateMedication('Medication Received');
    }

    completeUpdateLeecare() {
        if (this.nurseName.trim() == "") {
            this.toastrService.show("Please input the name of nurse", "Error", {status: 'danger', duration: 3000});
            return;
        }
        this.updateMedication('Updated LeeCare');
    }

    updateMedication(status, file?) {
        this.medicationService.updateMedication(this.medication['medications_id'], status, file, this.nurseName).then(response => {
            if (!response.ok) {
                this.toastrService.show("Failed to update the medication", "Error", {status: 'danger', duration: 3000});
            }
            return response.json();
        }).then(result => {
            if (result['status'] == 200) {
                this.toastrService.show("Updated the medication successfully", "Success", {status: 'success', duration: 3000});
                this.stepperIndex = MEDICATION_STATUS[status];
                if (MEDICATION_STATUS[status] == 5) {
                    this.dialogRef.close();
                }
            } else {
                this.toastrService.show(result['message'], "Error", {status: 'danger', duration: 3000});
            }
        });
        this.toastrService.show("Updating medication", "Info", {status: 'info', duration: 3000});
    }
}
