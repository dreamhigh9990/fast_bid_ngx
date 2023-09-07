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
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { ConclusionsService, ExperiencesService, GreetingsService, IntroducesService, QuestionsService, QuotationsService, TemplatesService, UrlsService } from '../../../shared';

@Component({
    selector: 'app-template-dialog-view',
    templateUrl: './template-dialog.component.html',
    styleUrls: ['./template-dialog.component.scss'],
})

export class TemplateDialogComponent implements OnInit {

    @Input() templateData: any;

    bidTemplate: any = {};
    myBidTemplate: any = [];
    templateName = "";
    bidText = "";

    constructor(private templateService: TemplatesService,
        private toastrService: NbToastrService,
        private dialogRef: NbDialogRef<any>,
        private greetingService: GreetingsService,
        private introduceService: IntroducesService,
        private experienceService: ExperiencesService,
        private urlService: UrlsService,
        private questionService: QuestionsService,
        private quotationService: QuotationsService,
        private conclusionService: ConclusionsService,) {
    }

    ngOnInit() {
        this.bidTemplate = {};
        this.greetingService.getGreetings().then(data => {
            this.bidTemplate.greetings = data;
            return this.introduceService.getIntroduces();
        }).then(data => {
            this.bidTemplate.introduces = data;
            return this.experienceService.getExperiences();
        }).then(data => {
            this.bidTemplate.experiences = data;
            return this.urlService.getUrls();
        }).then(data => {
            data.forEach(url => {
                url.template = url.url + ' - ' + url.title + '\r\n' + url.description;
            });
            this.bidTemplate.urls = data;
            return this.questionService.getQuestions();
        }).then(data => {
            this.bidTemplate.questions = data;
            return this.quotationService.getQuotations();
        }).then(data => {
            this.bidTemplate.quotations = data;
            return this.conclusionService.getConclusions();
        }).then(data => {
            this.bidTemplate.conclusions = data;
            this.myBidTemplate = Object.entries(this.bidTemplate);

            if (this.templateData) {
                this.templateName = this.templateData['name'];
                let template = JSON.parse(this.templateData['template']);
                this.myBidTemplate = this.myBidTemplate.map(e => {
                    e[2] = template[e[0]] >= 0; // Checked or not
                    if (e[2]) {
                        e[3] = e[1][template[e[0]]]['template']; // Selected Text
                    }
                    e[4] = template[e[0]]; // Selected number
                    return e;
                });
            } else {
                this.myBidTemplate = this.myBidTemplate.map(e => {
                    e[2] = true;
                    if (e[0] == 'quotations') {
                        e[2] = false;
                    }
                    e[3] = e[1][0]['template'];
                    e[4] = 0;
                    return e;
                });
            }
        });
    }

    getAutoBid() {
        var bidStr: string = "";
        this.myBidTemplate.map(e => {
            if (e[2]) {
                if (e[0] == 'questions') {
                    bidStr += '\r\nCan I ask the questions?\r\n';
                }
                if (e[0] == 'quotations' || e[0] == 'conclusions') {
                    bidStr += '\r\n';
                }
                bidStr += e[3] + "\r\n";
            }
        });

        this.bidText = bidStr;
        return bidStr;
    }

    checkTemplate(event, template) {
        if (template[0] == 'urls' || template[0] == 'experiences') {
            this.myBidTemplate.forEach(temp => {
                if ((temp[0] == 'urls' || temp[0] == 'experiences')) {
                    temp[2] = event;
                }
            })
        }
    }

    changeTemplate(event, template) {
        template[3] = template[1][event]['template'];
        template[4] = event;
    }

    addNewTemplate() {
        if (!this.templateName.trim()) {
            this.toastrService.show("Please input the name of template.", "Error", {status: 'danger'});
            return;
        }

        let newTemplate = {};
        newTemplate['name'] = this.templateName;
        newTemplate['text'] = this.bidText;
        newTemplate['template'] = {};
        for (const template of this.myBidTemplate) {
            newTemplate['template'][template[0]] = template[2] ? parseInt(template[4]) : -1;
        }
        newTemplate['template'] = JSON.stringify(newTemplate['template']);

        if (this.templateData) {
            this.templateService.updateTemplate(this.templateData['templates_id'], newTemplate).then(result => {
                if (result['status'] == 200) {
                    this.toastrService.show(result['message'], "Success", {status: 'success'});
                    this.dialogRef.close();
                }
            });
            return;
        }
        
        this.templateService.addTemplate(newTemplate).then(result => {
            if (result['status'] == 200) {
                this.toastrService.show(result['message'], "Success", {status: 'success'});
                this.dialogRef.close();
            }
        });
    }
}
