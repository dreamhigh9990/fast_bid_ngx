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
import { IntroducesService } from '../../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'app-introduces-view',
    templateUrl: './introduces.component.html',
    styleUrls: ['./introduces.component.scss'],
})
export class IntroducesComponent {
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
            introduces_id: {
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

    constructor(private service: IntroducesService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = this.service.getLinkForIntroduces();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectIntroduce(event) {
        console.log(event.target);
    }

    onDeleteConfirm(event): void {
        const introduce = event.data;
        console.log(introduce);
        if (window.confirm('Are you sure you want to delete?')) {
            this.service.deleteIntroduce(introduce.introduces_id).then(result => {
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
        const newIntroduce = event.newData;
        this.service.addIntroduce(newIntroduce.template).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
                this.source.refresh();
            } else {
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event) {
        const newIntroduce = event.newData;
        this.service.updateIntroduce(newIntroduce.introduces_id, newIntroduce.template).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
                this.source.refresh();
            } else {
                event.confirm.reject();
            }
        });
    }
}
