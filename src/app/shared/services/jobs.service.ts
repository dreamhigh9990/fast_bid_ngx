import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class JobsService {

  constructor(private apiService: ApiService) { }

  getLinkForJobs() {
    return this.apiService.getLink('job/get_jobs_list');
  }

  getJobs(): Promise<any> {
    return this.apiService.get('job/get_jobs_list');
  }

  getJobsCount() {
    return this.apiService.get('job/get_jobs_count');
  }

  getJobDetail(jobs_id) {
    const params = new HttpParams().set('jobs_id', jobs_id);
    return this.apiService.get('job/get_jobs_detail', params);
  }

  addJob(jobs_id, title, description, country, payment, reviews, score, since, min_budget, max_budget, skills, url, currency, type) {
    console.log({jobs_id, title, description, country, payment, reviews, score, since, min_budget, max_budget, skills, url, currency, type});
    return this.apiService.post('job/add_new_job', {jobs_id, title, description, country, payment, reviews, score, since, min_budget, max_budget, skills, url, currency, type});
  }

  deleteJob(jobs_id) {
    return this.apiService.post('job/delete_job', {jobs_id});
  }

  updateJobList() {
    return this.apiService.get('job/update_job_list');
  }
}