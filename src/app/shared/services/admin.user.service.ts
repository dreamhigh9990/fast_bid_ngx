import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { AdminUser } from '../models';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AdminUserService {
  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private auth: NbAuthService,
  ) {}

  async getCurrentUser(): Promise<AdminUser> {
    let token = await this.auth.getToken().toPromise();
    const user = await this.apiService.get('admin_user/get_user_info?token=' + token);
    let adminUser: AdminUser = user['admin_user'] as AdminUser;
    return adminUser;
  }

  // Update the user on the server (email, pass, etc)
  // update(user: AdminUser, imageFile: File = null): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('user_info', JSON.stringify(
  //     {full_name: user.full_name, email: user.email, user_name: user.user_name}));
  //   if (imageFile != null) {
  //     formData.append('image', imageFile, imageFile.name);
  //   }
  //   return this.apiService
  //   .postForm('/admin_user/set_user_info', formData)
  //   .map(data => {
  //     // Update the currentUser observable

  //     if (data.status != 200) {
  //       return Observable.throw(data.message);
  //     } else {
  //       user.photo = data.user.photo;
  //       this.currentAdminUserSubject.next(user);
  //       return user;
  //     }
  //   });
  // }

  // updatePassword(user_name: string, currentPassword: string, password: string): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('user_info', JSON.stringify(
  //     {user_name: user_name, currentPassword: currentPassword, password: password}));

  //   return this.apiService
  //   .postForm('/admin_user/set_user_info', formData)
  //   .map(data => {
  //     // Update the currentUser observable

  //     if (data.status !== 200) {
  //       return Observable.throw(data.message);
  //     } else {
  //       return true;
  //     }
  //   });
  // }

}
