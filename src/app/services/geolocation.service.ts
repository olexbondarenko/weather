import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation } from '../interfaces/geolocation';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  constructor(private http: HttpClient) { }

  getCurrentLocation(): Observable<Geolocation> {
    let params = {
      fields: "city,regionName,lat,lon",

    }
    return this.http.get<Geolocation>("http://ip-api.com/json/", { params });
  }
}
