import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class UrlsService {

  constructor(private apiService: ApiService) { }

  getLinkForUrls() {
    return this.apiService.getLink('url/get_urls_list');
  }

  getUrls(): Promise<any> {
    return this.apiService.get('url/get_urls_list');
  }

  getUrlsCount() {
    return this.apiService.get('url/get_urls_count');
  }

  getUrlDetail(urls_id) {
    const params = new HttpParams().set('urls_id', urls_id);
    return this.apiService.get('url/get_urls_detail', params);
  }

  addUrl(title, url, description) {
    return this.apiService.post('url/add_new_url', {title, url, description});
  }

  updateUrl(urls_id, title, url, description) {
    return this.apiService.post('url/update_url', {urls_id, title, url, description});
  }

  deleteUrl(urls_id) {
    return this.apiService.post('url/delete_url', {urls_id});
  }
}