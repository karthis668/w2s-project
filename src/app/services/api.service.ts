import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiurl = "https://jsonplaceholder.typicode.com/";
  constructor(
    public http: HttpClient
  ) { }

  getSampleData(){
    return this.http.get(this.apiurl+'users');
  }
}
