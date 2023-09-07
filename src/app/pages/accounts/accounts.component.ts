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
import { AccountsService } from '../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { ActiveTimeRenderComponent } from './active.time.render.component';
@Component({
    selector: 'app-accounts-view',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
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
            accounts_id: {
                title: 'ID',
                width: '10%',
                editable: false,
            },
            user_name: {
                title: 'User Name',
                width: '20%',
            },
            email: {
                title: 'Email',
                width: '20%',
            },
            full_name: {
                title: 'Full Name',
                width: '20%',
            },
            type: {
                title: 'Type',
                width: '10%',
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            { value: 'freelancer', title: 'Freelancer' },
                            { value: 'upwork', title: 'Upwork' },
                        ],
                    },
                }
            },
            active_time: {
                title: 'Active Time',
                width: '20%',
                editable: false,
                sort: false,
                filter: false,
                type: 'custom',
                renderComponent: ActiveTimeRenderComponent,
            },
        },
    };
    source: ServerDataSource;

    constructor(private service: AccountsService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = this.service.getLinkForAccounts();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectAccount(event) {
        console.log(event.target);
    }

    onDeleteConfirm(event): void {
        const account = event.data;
        console.log(account);
        if (window.confirm('Are you sure you want to delete?')) {
            this.service.deleteAccount(account.accounts_id).then(result => {
                if (result['status'] == 200) {
                    event.confirm.resolve();
                } else {
                    event.confirm.reject();
                }
            });
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event) {
        const newAccount = event.newData;
        this.service.addAccount(newAccount.user_name, newAccount.email, newAccount.full_name, newAccount.type).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
            } else {
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event) {
        const newAccount = event.newData;
        this.service.updateAccount(newAccount.accounts_id, newAccount.user_name, newAccount.email, newAccount.full_name, newAccount.type).then(result => {
            if (result['status'] == 200) {
                event.confirm.resolve();
            } else {
                event.confirm.reject();
            }
        });
    }
}
