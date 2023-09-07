import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // if (this.jwtService.getToken()) {
    //   headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    // }
    return new HttpHeaders(headersConfig);
  }

  getLink(path: string) {
    return `${environment.api_url}${path}`;
  }

  get(path: string, params: HttpParams = new HttpParams()): Promise <Object> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params: params })
    .toPromise();
  }

  getFromUrl(path: string, params: HttpParams = new HttpParams()): Promise <Object> {
    return this.http.get(`${path}`, { headers: this.setHeaders(), params: params })
    .toPromise();
  }

  put(path: string, body: Object = {}): Promise <Object> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() },
    )
    .toPromise();
  }

  postForm(path: string, formData: FormData): Promise <Object> {
    return this.http.post(
      `${environment.api_url}${path}`,
      formData,
    )
    .toPromise();
  }

  post(path: string, body: Object = {}): Promise <Object> {

    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() },
    )
    .toPromise();
  }

  delete(path): Promise <Object> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() },
    )
    .toPromise();
  }
}
