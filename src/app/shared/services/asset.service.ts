import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class AssetService {

  constructor(private apiService: ApiService) { }


  getAssets(): Promise<any> {
    return this.apiService.get('asset/get_assets');
  }

  addAsset(params): Promise<any> {
    return this.apiService.post('asset/add_asset', params);
  }

  deleteAsset(params): Promise<any> {
    return this.apiService.post('asset/delete_asset', params);
  }

  updateAsset(params): Promise<any> {
    return this.apiService.post('asset/update_asset', params);
  }

}
