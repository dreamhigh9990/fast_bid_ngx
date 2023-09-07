import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class MessagesService {

  constructor(private apiService: ApiService) { }

  getLinkForMessages() {
    return this.apiService.getLink('message/get_messages_list');
  }

  getMessages(): Promise<any> {
    return this.apiService.get('message/get_messages_list');
  }

  getMessagesCount() {
    return this.apiService.get('message/get_messages_count');
  }

  getUnreadMessagesCount() {
    return this.apiService.get('message/get_unread_messages_count');
  }

  getMessageDetail(messages_id) {
    const params = new HttpParams().set('messages_id', messages_id);
    return this.apiService.get('message/get_messages_detail', params);
  }

  // addMessage(user_name, email, full_name, type) {
  //   return this.apiService.post('message/add_new_message', {user_name, email, full_name, type});
  // }

  updateMessage(messages_id, read_date) {
    return this.apiService.post('message/update_message', {messages_id, read_date});
  }

  markAllRead() {
    return this.apiService.post('message/mark_all_read');
  }

  deleteMessage(messages_id) {
    return this.apiService.post('message/delete_message', {messages_id});
  }
}