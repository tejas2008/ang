import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventSearchModel } from '../models/event-search.model';
import { of, EMPTY } from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class EventSearchService {
  ip_info_token = 'dc07f20408252e';
  gmap_api_key = 'AIzaSyDwzby_rGA5MdY3OuF1Ihdj4ttSAAqlq0c';

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://node-backend-dot-assignment8-382502.wl.r.appspot.com/';
  // private baseUrl = 'http://localhost:4000'
  url:string;


  ngOnInit(): void {
  }

  getipinfo(): Observable<any> {
    const ip_info_url = "https://ipinfo.io/68.181.16.70?token="+this.ip_info_token; 
    return this.http.get<any>(ip_info_url);
  }
  
 
  getEvents(data: any, lat: any, lng: any): Observable<any> {
    console.log(1);
    this.url = `${this.baseUrl}/events?keyword=${data.keyword}&distance=${data.distance}&category=${data.category}&lat=${lat}&lng=${lng}`;
    return this.http.get<any>(this.url);
  }

  getEventCarousel(id: String): Observable<any>{
    console.log(2);
    this.url = `${this.baseUrl}/event-details?id=${id}`;
    return this.http.get<any>(this.url);
  }

  getVenue(name: any): Observable<any>{
    console.log(3, name);
    this.url = `${this.baseUrl}/venue?name=${name}`;
    return this.http.get<any>(this.url);
  }

  gmapsApi(loc: any): Observable<any>{
  const gmap_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${this.gmap_api_key}`;
  return this.http.get<any>(gmap_url);
  }

  getautoComplete(keyword: any): Observable<any>{
    this.url = `${this.baseUrl}/autocomplete?keyword=${keyword}`;
    return this.http.get<any>(this.url);
  }

}
