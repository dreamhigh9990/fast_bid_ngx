import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class FloorplanService {

  constructor(private apiService: ApiService) { }

  // getResidentsCount() {
  //   return this.apiService.get('resident/get_residents_count');
  // }

  // getResidentDetail(residentId) {
  //   const params = new HttpParams().set('residents_id', residentId);
  //   return this.apiService.get('resident/get_residents_detail', params);
  // }

  // getLinkForResidents() {
  //   return this.apiService.getLink('resident/get_residents_list');
  // }

  getFloorplans(): Promise<any> {
    return this.apiService.get('floorplan/get_floorplans');
  }

  // uploadCSV(fileToUpload: File): Promise<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('csv', fileToUpload);
  //   return fetch(this.apiService.getLink('resident/upload_csv'), {method: "POST", body: formData});
  // }
}
