import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class IntroducesService {

  constructor(private apiService: ApiService) { }

  getLinkForIntroduces() {
    return this.apiService.getLink('introduce/get_introduces_list');
  }

  getIntroduces(): Promise<any> {
    return this.apiService.get('introduce/get_introduces_list');
  }

  getIntroducesCount() {
    return this.apiService.get('introduce/get_introduces_count');
  }

  getIntroduceDetail(introduces_id) {
    const params = new HttpParams().set('introduces_id', introduces_id);
    return this.apiService.get('introduce/get_introduces_detail', params);
  }

  addIntroduce(template) {
    return this.apiService.post('introduce/add_new_introduce', {template});
  }

  updateIntroduce(introduces_id, template) {
    return this.apiService.post('introduce/update_introduce', {introduces_id, template});
  }

  deleteIntroduce(introduces_id) {
    return this.apiService.post('introduce/delete_introduce', {introduces_id});
  }
}