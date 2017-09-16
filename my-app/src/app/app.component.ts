import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ' NASTYMA';


  devices = [

            {name:'Nokia Body Connected Scale',online:false,secure:0},
            {name:'Philips Hue Lightstrips',online:true,secure:0},
            {name:'Smart-Home-Camera',online:true,secure:0},
            {name:'Devolo Home Control',online:true,secure:0},
            {name:'IP-Cam',online:true,secure:0}
          ];
}
