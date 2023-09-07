import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class ConclusionsService {

  constructor(private apiService: ApiService) { }

  getLinkForConclusions() {
    return this.apiService.getLink('conclusion/get_conclusions_list');
  }

  getConclusions(): Promise<any> {
    return this.apiService.get('conclusion/get_conclusions_list');
  }

  getConclusionsCount() {
    return this.apiService.get('conclusion/get_conclusions_count');
  }

  getConclusionDetail(conclusions_id) {
    const params = new HttpParams().set('conclusions_id', conclusions_id);
    return this.apiService.get('conclusion/get_conclusions_detail', params);
  }

  addConclusion(template) {
    return this.apiService.post('conclusion/add_new_conclusion', {template});
  }

  updateConclusion(conclusions_id, template) {
    return this.apiService.post('conclusion/update_conclusion', {conclusions_id, template});
  }

  deleteConclusion(conclusions_id) {
    return this.apiService.post('conclusion/delete_conclusion', {conclusions_id});
  }
}