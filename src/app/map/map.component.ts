import {Component, OnInit} from '@angular/core';
import { ServicioService } from '../servicio.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import { SnackBarComponentSnackComponent} from '../snack-bar-component-snack/snack-bar-component-snack.component'
import {MatSnackBar} from '@angular/material/snack-bar';

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
  loading :boolean = false ;
  durationInSeconds = 5;

  constructor(public servicio: ServicioService ,private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initializeMapOptions();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
    this.size =  (window.innerWidth <= 600) ? "2:0.4":"2:1"
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
    this.size =  (window.innerWidth <= 600) ? "2:0.4":"2:1"
  }

  getGeolocalizacion(){
  this.loading = true;
  let ipDomain = this.ValidateIPaddress(this.ip);
  if( ipDomain != ""){
    this.servicio.getGeolocalizacion(ipDomain +'='+ this.ip).then(
      data => {
        this.geolocalizacion = <Root>data ;
        this.map.setView([this.geolocalizacion.location.lat, this.geolocalizacion.location.lng],14)
        this.addSampleMarker(this.geolocalizacion.location.lat,this.geolocalizacion.location.lng);
        console.log(this.geolocalizacion);
        this.loading = false;
      }
    ).catch(
      error => {
        console.error(error);
        this.loading = false;
      });
  }else{
  this.openSnackBar();
  this.loading = false;
  this.ip = '';
  }

  }

  ValidateIPaddress(ipaddress: string) {
   // if (/(^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$)|([www.]?.+\.com(\.[a-z]+)?)/.test(ipaddress)) {
    if (/(^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$)/.test(ipaddress)) {
      return 'ipAddress'
    }else if (/([www.]?.+\.com(\.[a-z]+)?)/.test(ipaddress)) {
      return 'domain'
    }else if(ipaddress == ""){
      return 'ipAddress'
    }

    return ""
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponentSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
}