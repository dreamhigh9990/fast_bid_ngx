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

import { Component } from '@angular/core';
import { ExperiencesService } from '../../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'app-experiences-view',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent {
    fileToUpload: File | null = null;

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            experiences_id: {
                title: 'ID',
                width: '20%',
                editable: false,
            },
            template: {
                title: 'Template',
                width: '80%',
                editor: {
                    type: 'textarea',
                },
            },
        },
    };
    source: ServerDataSource;

    constructor(private service: ExperiencesService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = this.service.getLinkForExperiences();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectExperience(event) {
        console.log(event.target);
    }

    onDeleteConfirm(event): void {
        const introduce = event.data;
        console.log(introduce);
        if (window.confirm('Are you sure you want to delete?')) {
            this.service.deleteExperience(introduce.experiences_id).then(result => {
                if (result['status'] == 200) {
                    event.confirm.resolve();
                    this.source.refresh();
                } else {
                    event.confirm.reject();
                }
            });
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event) {
        const newExperience = event.newData;
        this.service.addExperience(newExperience.template).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
                this.source.refresh();
            } else {
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event) {
        const newExperience = event.newData;
        this.service.updateExperience(newExperience.experiences_id, newExperience.template).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
                this.source.refresh();
            } else {
                event.confirm.reject();
            }
        });
    }
}
