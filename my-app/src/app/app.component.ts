import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ' NastyMa';

  


  devices = [
            {name:'AVM FRITZ Box'},
            {name:'Nokia Body Connected Scale'},
            {name:'Philips Hue Bridge'},
            {name:'Philips Hue Lightstrips'},
            {name:'Beurer BY'},
            {name:'Smart Plug'},
            {name:'Smart-Home-Camera'},
            {name:'Devolo Home Control'},
            {name:'IP-Cam'}
          ];
}


