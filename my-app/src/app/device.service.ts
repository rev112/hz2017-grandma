import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Device } from '../app/device.model';
import { Observable } from 'rxjs/Observable';

import { TypedJSON } from 'typedjson-npm/src/typed-json';

import 'rxjs/add/operator/map';

@Injectable()
export class DeviceService {
  constructor(private http: Http) {
  }

  getDevices(): Observable<Device[]> {

    return this.http
      .get("http://localhost:5000/devices",new Headers({'Content-Type': 'application/json'}))
      .map((response: Response) => {
        console.log(response)
        if(response.ok) {
          let devices = response.json().map(device => {
            let tmpDevice = TypedJSON.parse(JSON.stringify(device), Device);

            return tmpDevice;
          });
          return devices;
        }
      });
  }

  getDevice(id: number): Observable<Device> {
    return this.http
      .get("http://localhost:5000/devices/" + id,new Headers({'Content-Type': 'application/json'}))
      .map((response: Response) => {
        if(response.ok) {
          return TypedJSON.parse(response.text(), Device);
        }
      });
  }

}
