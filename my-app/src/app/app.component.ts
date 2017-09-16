import { Component } from '@angular/core';

import { DeviceService } from '../app/device.service';
import { Device } from '../app/device.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public devices:Device[] = [];

  constructor(private deviceService: DeviceService) {

  }

  title = ' NASTYMA';

  ngOnInit() {
    this.deviceService.getDevices().subscribe(devices => {
      console.log(devices)
      this.devices = devices;
    })

  }

  // devices = [
  //
  //           {name:'Nokia Body Connected Scale',online:false,secure:0},
  //           {name:'Philips Hue Lightstrips',online:true,secure:0},
  //           {name:'Smart-Home-Camera',online:true,secure:0},
  //           {name:'Devolo Home Control',online:true,secure:0},
  //           {name:'IP-Cam',online:true,secure:0}
  //         ];
}
