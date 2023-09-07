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
import { TemplatesService } from '../../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TemplateDialogComponent } from './template-dialog.component';
@Component({
    selector: 'app-templates-view',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
    fileToUpload: File | null = null;

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
            custom: [
                {
                    name: 'edit',
                    title: '<i class="nb-edit"></i>'
                },
                {
                    name: 'delete',
                    title: '<i class="nb-trash"></i>'
                },
            ],
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            templates_id: {
                title: 'ID',
                width: '10%',
                editable: false,
            },
            name: {
                title: 'Name',
                width: '20%',
            },
            text: {
                title: 'Text',
                width: '70%',
                editor: {
                    type: 'textarea',
                },
            },
        },
    };
    source: ServerDataSource;

    constructor(private service: TemplatesService, public http: HttpClient, private dialogService: NbDialogService, private toastrService: NbToastrService) {
        const link = this.service.getLinkForTemplates();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectTemplate(event) {
        console.log(event.target);
    }

    addNewTemplate() {
        this.dialogService.open(TemplateDialogComponent, {
            context: {
            },
        }).onClose.subscribe(_ => {
            this.source.refresh();
        });
    }

    onCustomAction(event) {
        const template = event.data;
        if (event.action == 'edit') {
            this.dialogService.open(TemplateDialogComponent, {
                context: {
                    templateData: template,
                },
            }).onClose.subscribe(_ => {
                this.source.refresh();
            });
        } else if (event.action == 'delete') {
            if (window.confirm('Are you sure you want to delete?')) {
                this.service.deleteTemplate(template.templates_id).then(result => {
                    if (result['status'] == 200) {
                        this.toastrService.show(result['message'], "Success", {status: 'success'});
                    }
                });
            }
        }
    }
}
