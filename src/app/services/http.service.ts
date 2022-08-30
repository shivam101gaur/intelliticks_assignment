import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { airtable_authKey, airtable_pms_base_id } from 'src/environments/environment.prod';
import properties from '../data/properties';
import { deleteResponse, getProperties, postPropertyReqestBody, Record } from '../models/airtable.model';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${airtable_authKey}`
  });

  _apiUrl = `https://api.airtable.com/v0/${airtable_pms_base_id}/Properties/`

  constructor(private http: HttpClient) { }

  getProperties() {
    return this.http.get<getProperties>(this._apiUrl, { headers: this.headers })
  }

  postProperty(property: Property) {
    const toPostProperty: postPropertyReqestBody = { fields: property }
    return this.http.post<Record>(this._apiUrl, toPostProperty, { headers: this.headers });
  }

  deleteProperty(property_id: string) {
    return this.http.delete<deleteResponse>(this._apiUrl + property_id, { headers: this.headers })
  }

}
