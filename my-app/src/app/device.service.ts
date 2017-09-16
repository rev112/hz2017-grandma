import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Device } from '../app/device.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {
  constructor(private http: Http) {
  }

  // 
  // getDevices(): Observable<any> {
  //   let url = "http://127.0.0.1:5000/devices";
  //
  //   return this.http.get(url)
  //     .map((response: Response) => {
  //     if(response.ok) {
  //       let devices = response.json().content.map(device => {
  //         if(response.ok) {
  //           let tmpDevice:Device;
  //           tmpDevice.ip = device.ip;
  //           tmpDevice.mac = device.mac;
  //           tmpDevice.name = device.name;
  //           tmpDevice.online = device.online;
  //           return tmpDevice;
  //         }
  //       })
  //     }
  //   }
  // }

}
