import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextQuotaService {

  constructor(private http: HttpClient) { }

  getQuota() {
    return this.http.get(`https://textbelt.com/quota/${environment.textBeltAPIKey}`)
  }
}
