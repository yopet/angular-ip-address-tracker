import {Component, OnInit} from '@angular/core';
import { ServicioService } from '../servicio.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import{Root} from '../geolocalizacion'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Map;
  mapOptions: MapOptions;
  breakpoint: number;
  size:string;
  geolocalizacion : Root;
  ip:string = '';

  constructor(public servicio: ServicioService) {
  }

  ngOnInit() {
    this.initializeMapOptions();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
    this.size =  (window.innerWidth <= 600) ? "2:0.4":"2:0.8"
  }

  onMapReady(map: Map) {
    this.map = map;
    //this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(0, 0),
      zoom: 0,
      zoomControl :false,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  private addSampleMarker(lat:number ,Lng:number) {
    let marker = new Marker([lat, Lng])
      .setIcon(
        icon({
          iconSize: [30, 36],       
          iconUrl: 'assets/images/icon-location.svg'
        }));
    marker.addTo(this.map);
  }

  onResize(event : any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 4;
    this.size =  (window.innerWidth <= 600) ? "2:0.4":"2:0.8"
  }

  getGeolocalizacion(){
 
   this.servicio.getGeolocalizacion(this.ip).then(
      data => {
        this.geolocalizacion = <Root>data ;
        this.map.setView([this.geolocalizacion.location.lat, this.geolocalizacion.location.lng],16)
        this.addSampleMarker(this.geolocalizacion.location.lat,this.geolocalizacion.location.lng);
        console.log(this.geolocalizacion);
      }
    ).catch(
      error => {
        console.error(error);
      });
  }

}