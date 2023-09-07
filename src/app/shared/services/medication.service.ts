import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class MedicationService {

  constructor(private apiService: ApiService) { }

  getMedicationsCount() {
    return this.apiService.get('medication/get_medications_count');
  }

  getOutstandingMedicationsCount() {
    return this.apiService.get('medication/get_outstanding_medications_count');
  }

  getLinkForMedications(residentsId) {
    return this.apiService.getLink('medication/get_medications_list?residents_id_like=' + residentsId);
  }

  getLinkForRunningMedications() {
    return this.apiService.getLink('medication/get_medications_list?only_running=1');
  }

  getLinkForOverdueMedications() {
    return this.apiService.getLink('medication/get_medications_list?only_running=1&overdue=1');
  }

  addNewMedication(residentsId, medicationDetail) {
    return this.apiService.post('medication/add_new_medication', {residents_id: residentsId, medication_text: medicationDetail, status: 'Started'});
  }

  updateMedication(medicationsId, status, rxChartFile?, nurseName?): Promise<Response> {
    const formData: FormData = new FormData();
    if (rxChartFile) {
      formData.append('file', rxChartFile);
    }
    formData.append('medications_id', medicationsId);
    formData.append('status', status);
    if (status == "Updated LeeCare") {
      formData.append('nurse_name', nurseName);
      formData.append('is_ended', "1");
    }
    return fetch(this.apiService.getLink('medication/update_medication'), {method: "POST", body: formData});
  }
}