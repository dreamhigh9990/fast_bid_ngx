import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class BidService {

  constructor(private apiService: ApiService) { }


  getTaskInfo(seo_url): Promise<any> {
    // var pUrl:string = seo_url;
    // pUrl = "%5B%5D="+pUrl.replace(":","%2F");
    // var url=`https://www.freelancer.com/api/projects/0.1/projects?limit=1&attachment_details=true&full_description=true&job_details=true&location_details=true&nda_details=true&project_collaboration_details=true&seo_urls${pUrl}&selected_bids=true&qualification_details=true&upgrade_details=true&review_availability_details=true&local_details=true&equipment_details=true&invited_freelancer_details=true&client_engagement_details=true&contract_signature_details=true&enterprise_linked_projects_details=true&webapp=1&compact=true&new_errors=true&new_pools=true`;
    var url=`https://www.freelancer.com/api/projects/0.1/projects/${seo_url}`;
    return this.apiService.getFromUrl(url);
  }

  getTaskSeoInfo(seo_url): Promise<any> {
    var pUrl:string = seo_url;
    pUrl = "%5B%5D="+pUrl.replace("/","%2F");
    var url=`https://www.freelancer.com/api/projects/0.1/projects?limit=1&attachment_details=true&full_description=true&job_details=true&location_details=true&nda_details=true&project_collaboration_details=true&seo_urls${pUrl}&selected_bids=true&qualification_details=true&upgrade_details=true&review_availability_details=true&local_details=true&equipment_details=true&invited_freelancer_details=true&client_engagement_details=true&contract_signature_details=true&enterprise_linked_projects_details=true&webapp=1&compact=true&new_errors=true&new_pools=true`;
    return this.apiService.getFromUrl(url);
  }

  getBidsInfo(taskId): Promise<any> {

    var url=`https://www.freelancer.com/api/projects/0.1/projects/${taskId}/bids?limit=100&bid_ratings=true&quotations=true&webapp=1&compact=true&new_errors=true&new_pools=true`;
    return this.apiService.getFromUrl(url);
  }

  getUserInfo(userId): Promise<any> {
    var url=`https://www.freelancer.com/api/users/0.1/users?location_details=true&qualification_details=true&webapp=1&compact=true&new_errors=true&new_pools=true&avatar=true&badge_details=true&country_details=true&display_info=true&employer_reputation=true&jobs=true&membership_details=true&preferred_details=true&responsiveness=true&reputation=true&sanction_details=true&status=true&profile_description=true&users%5B%5D=${userId}`;
    return this.apiService.getFromUrl(url);
  }

  getUserClientInfo(userId): Promise<any> {
    var url=`https://www.freelancer.com/api/projects/0.1/reviews/?compact=true&contest_details=true&contest_job_details=true&limit=6&project_details=true&project_job_details=true&review_types%5B%5D=project&review_types%5B%5D=contest&role=employer&to_users%5B%5D=${userId}&user_avatar=true&user_country_details=true&user_details=true`;
    return this.apiService.getFromUrl(url);
  }

  getUserFreelancerInfo(userId): Promise<any> {
    var url=`https://www.freelancer.com/api/projects/0.1/reviews/?limit=50&role=freelancer&to_users%5B%5D=${userId}&project_details=true&contest_details=true&project_job_details=true&contest_job_details=true&review_types%5B%5D=contest&review_types%5B%5D=project&webapp=1&compact=true&new_errors=true&new_pools=true`;
    return this.apiService.getFromUrl(url);
  }

  getLinkForBids() {
    return this.apiService.getLink('bid/get_bids_list');
  }

  getBids(): Promise<any> {
    return this.apiService.get('bid/get_bids_list');
  }

  getBidsCount() {
    return this.apiService.get('bid/get_bids_count');
  }

  getTodayBidsCount() {
    return this.apiService.get('bid/get_today_bids_count');
  }

  getBidDetail(bids_id) {
    const params = new HttpParams().set('bids_id', bids_id);
    return this.apiService.get('bid/get_bids_detail', params);
  }

  addBid(jobs_id, users_id, accounts_user_name, proposal, price, period) {
    return this.apiService.post('bid/add_new_bid', {jobs_id, users_id, accounts_user_name, proposal, price, period});
  }

  deleteBid(bids_id) {
    return this.apiService.post('bid/delete_bid', {bids_id});
  }
}
