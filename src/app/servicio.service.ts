import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  private REST_API_SERVER = "https://geo.ipify.org/api/v1?apiKey=at_yquC6iCdqf7fKInWPRu8CGDUWfFIC&ipAddress=";

  constructor(private httpClient: HttpClient) { }

  getGeolocalizacion(IP:string) {
  
    return new Promise(resolve => {
      this.httpClient.get(this.REST_API_SERVER + IP)         
        .subscribe( data => {          
          resolve(data);
        },
        error => {
          console.error(error);
        });
    })
 

  }
  
}
