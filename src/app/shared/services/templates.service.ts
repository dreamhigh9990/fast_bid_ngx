import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class TemplatesService {

  constructor(private apiService: ApiService) { }

  getLinkForTemplates() {
    return this.apiService.getLink('template/get_templates_list');
  }

  getTemplates(): Promise<any> {
    return this.apiService.get('template/get_templates_list');
  }

  getTemplatesCount() {
    return this.apiService.get('template/get_templates_count');
  }

  getTemplateDetail(templates_id) {
    const params = new HttpParams().set('templates_id', templates_id);
    return this.apiService.get('template/get_templates_detail', params);
  }

  addTemplate(template) {
    return this.apiService.post('template/add_new_template', {template});
  }

  updateTemplate(templates_id, template) {
    return this.apiService.post('template/update_template', {templates_id, template});
  }

  deleteTemplate(templates_id) {
    return this.apiService.post('template/delete_template', {templates_id});
  }
}