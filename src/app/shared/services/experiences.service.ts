import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class ExperiencesService {

  constructor(private apiService: ApiService) { }

  getLinkForExperiences() {
    return this.apiService.getLink('experience/get_experiences_list');
  }

  getExperiences(): Promise<any> {
    return this.apiService.get('experience/get_experiences_list');
  }

  getExperiencesCount() {
    return this.apiService.get('experience/get_experiences_count');
  }

  getExperienceDetail(experiences_id) {
    const params = new HttpParams().set('experiences_id', experiences_id);
    return this.apiService.get('experience/get_experiences_detail', params);
  }

  addExperience(template) {
    return this.apiService.post('experience/add_new_experience', {template});
  }

  updateExperience(experiences_id, template) {
    return this.apiService.post('experience/update_experience', {experiences_id, template});
  }

  deleteExperience(experiences_id) {
    return this.apiService.post('experience/delete_experience', {experiences_id});
  }
}