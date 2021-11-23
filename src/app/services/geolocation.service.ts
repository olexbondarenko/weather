import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Geolocation } from '../interfaces/geolocation';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  constructor(private http: HttpClient) { }

  getCurrentLocation(): Observable<Geolocation> {
    return this.http.get<Geolocation>("https://ipapi.co/json/");
  }
}
