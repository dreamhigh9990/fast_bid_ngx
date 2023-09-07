import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class QuotationsService {

  constructor(private apiService: ApiService) { }

  getLinkForQuotations() {
    return this.apiService.getLink('quotation/get_quotations_list');
  }

  getQuotations(): Promise<any> {
    return this.apiService.get('quotation/get_quotations_list');
  }

  getQuotationsCount() {
    return this.apiService.get('quotation/get_quotations_count');
  }

  getQuotationDetail(quotations_id) {
    const params = new HttpParams().set('quotations_id', quotations_id);
    return this.apiService.get('quotation/get_quotations_detail', params);
  }

  addQuotation(template) {
    return this.apiService.post('quotation/add_new_quotation', {template});
  }

  updateQuotation(quotations_id, template) {
    return this.apiService.post('quotation/update_quotation', {quotations_id, template});
  }

  deleteQuotation(quotations_id) {
    return this.apiService.post('quotation/delete_quotation', {quotations_id});
  }
}