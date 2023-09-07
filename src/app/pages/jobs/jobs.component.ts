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
import { JobsService } from '../../shared';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { ProjectIDRenderComponent } from '../history/project.id.render.component';
@Component({
    selector: 'app-jobs-view',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
    fileToUpload: File | null = null;

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            jobs_id: {
                title: 'ID',
                width: '5%',
                editable: false,
                type: 'custom',
                renderComponent: ProjectIDRenderComponent,
            },
            title: {
                title: 'Title',
                width: '40%',
            },
            country: {
                title: 'Country',
                width: '10%',
            },
            min_budget: {
                title: 'Min',
                width: '5%',
            },
            max_budget: {
                title: 'Max',
                width: '5%',
            },
            currency: {
                title: 'Currency',
                width: '5%',
            },
            payment: {
                title: 'Payment',
                width: '5%',
            },
            reviews: {
                title: 'Reviews',
                width: '5%',
            },
            score: {
                title: 'Score',
                width: '5%',
            },
            type: {
                title: 'Type',
                width: '5%',
            },
            created_at: {
                title: 'Date',
                width: '10%',
            },
        },
    };
    source: ServerDataSource;
    favorite: false;

    constructor(private service: JobsService, public http: HttpClient, private dialogService: NbDialogService) {
        const link = this.service.getLinkForJobs();
        this.source = new ServerDataSource(http, { endPoint: link });
    }

    onSelectJob(event) {
        console.log(event.target);
    }

    showFavorite(event) {
        let link = this.service.getLinkForJobs();
        if (event) {
            link += "?is_favorite=1";
        }
        this.source = new ServerDataSource(this.http, { endPoint: link });
    }
}
