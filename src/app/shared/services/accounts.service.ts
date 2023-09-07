import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class AccountsService {

  constructor(private apiService: ApiService) { }

  getLinkForAccounts() {
    return this.apiService.getLink('account/get_accounts_list');
  }

  getAccounts(): Promise<any> {
    return this.apiService.get('account/get_accounts_list');
  }

  getAccountsCount() {
    return this.apiService.get('account/get_accounts_count');
  }

  getAccountDetail(accounts_id) {
    const params = new HttpParams().set('accounts_id', accounts_id);
    return this.apiService.get('account/get_accounts_detail', params);
  }

  addAccount(user_name, email, full_name, type) {
    return this.apiService.post('account/add_new_account', {user_name, email, full_name, type});
  }

  updateAccount(accounts_id, user_name, email, full_name, type) {
    return this.apiService.post('account/update_account', {accounts_id, user_name, email, full_name, type});
  }

  deleteAccount(accounts_id) {
    return this.apiService.post('account/delete_account', {accounts_id});
  }
}