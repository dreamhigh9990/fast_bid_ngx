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
import { MessagesService } from '../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { DateTimeRenderComponent } from './date.time.render.component';
@Component({
    selector: 'app-messages-view',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
    fileToUpload: File | null = null;

    settings = {
        actions: {
            add: false,
            edit: false,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            messages_id: {
                title: 'ID',
                width: '10%',
                editable: false,
            },
            user_name: {
                title: 'User Name',
                width: '10%',
            },
            client_id: {
                title: 'Client ID',
                width: '10%',
            },
            message: {
                title: 'Message',
                width: '50%',
            },
            created_date: {
                title: 'Created Date',
                width: '10%',
                editable: false,
                filter: false,
                type: 'custom',
                renderComponent: DateTimeRenderComponent,
            },
            read_date: {
                title: 'Read Date',
                width: '10%',
                editable: false,
                filter: false,
                type: 'custom',
                renderComponent: DateTimeRenderComponent,
            },
        },
    };
    source: ServerDataSource;
    newMessagesCount = 0;

    constructor(private service: MessagesService, public http: HttpClient, private dialogService: NbDialogService, private toastrService: NbToastrService) {
        const link = this.service.getLinkForMessages();
        this.source = new ServerDataSource(http, { endPoint: link });

        this.service.getUnreadMessagesCount().then(result => {
            this.newMessagesCount = result['count'];
        })
    }

    onSelectMessage(event) {
        console.log(event.target);
    }

    onDeleteConfirm(event): void {
        const account = event.data;
        console.log(account);
        if (window.confirm('Are you sure you want to delete?')) {
            this.service.deleteMessage(account.messages_id).then(result => {
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
        const newMessage = event.newData;
        // this.service.addMessage(newMessage.user_name, newMessage.email, newMessage.full_name, newMessage.type).then(result => {
        //     if (result['status'] == 200) {
        //         event.confirm.resolve();
        //     } else {
        //         event.confirm.reject();
        //     }
        // });
    }

    onEditConfirm(event) {
        const newMessage = event.newData;
        // this.service.updateMessage(newMessage.messages_id, newMessage.user_name, newMessage.email, newMessage.full_name, newMessage.type).then(result => {
        //     if (result['status'] == 200) {
        //         event.confirm.resolve();
        //     } else {
        //         event.confirm.reject();
        //     }
        // });
    }

    markAllRead() {
        this.service.markAllRead().then(result => {
            if (result['status'] == 200) {
                this.toastrService.show(result['message'], 'Success', {status: 'success'});
                this.source.refresh();
                this.service.getUnreadMessagesCount().then(result => {
                    this.newMessagesCount = result['count'];
                })
            }
        })
    }
}
