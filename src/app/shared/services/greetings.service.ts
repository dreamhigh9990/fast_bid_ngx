import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class GreetingsService {

  constructor(private apiService: ApiService) { }

  getLinkForGreetings() {
    return this.apiService.getLink('greeting/get_greetings_list');
  }

  getGreetings(): Promise<any> {
    return this.apiService.get('greeting/get_greetings_list');
  }

  getGreetingsCount() {
    return this.apiService.get('greeting/get_greetings_count');
  }

  getGreetingDetail(greetings_id) {
    const params = new HttpParams().set('greetings_id', greetings_id);
    return this.apiService.get('greeting/get_greetings_detail', params);
  }

  addGreeting(template) {
    return this.apiService.post('greeting/add_new_greeting', {template});
  }

  updateGreeting(greetings_id, template) {
    return this.apiService.post('greeting/update_greeting', {greetings_id, template});
  }

  deleteGreeting(greetings_id) {
    return this.apiService.post('greeting/delete_greeting', {greetings_id});
  }
}