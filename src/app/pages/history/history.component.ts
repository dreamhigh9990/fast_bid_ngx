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
import { BidService } from '../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { ProjectIDRenderComponent } from './project.id.render.component';
@Component({
    selector: 'app-bid-history-view',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class BidHistoryComponent {
    fileToUpload: File | null = null;

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            bids_id: {
                title: 'ID',
                width: '10%',
                editable: false,
            },
            jobs_id: {
                title: 'Job ID',
                width: '7%',
                type: 'custom',
                renderComponent: ProjectIDRenderComponent,
            },
            users_id: {
                title: 'User ID',
                width: '6%',
            },
            accounts_user_name: {
                title: 'Account',
                width: '7%',
            },
            proposal: {
                title: 'Proposal',
                width: '40%',
            },
            price: {
                title: 'Price',
                width: '5%',
            },
            period: {
                title: 'Period',
                width: '5%',
            },
            created_at: {
                title: 'Created Date',
                width: '10%',
            },
            bid_at: {
                title: 'Bided Date',
                width: '10%',
            },
        },
    };
    source: ServerDataSource;

    constructor(private service: BidService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = this.service.getLinkForBids();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectBid(event) {
    }

    onDeleteConfirm(event): void {
        const bid = event.data;
        if (window.confirm('Are you sure you want to delete?')) {
            this.service.deleteBid(bid.bids_id).then(result => {
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
}
