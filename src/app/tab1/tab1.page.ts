import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  btnState = 'Start Measuring';
  latA : number;
  longA : number;
  latB:number;
  longB:number;
  distance: number =0;



  calculateDistance(lat1,long1,lat2,long2){
    

    //radians
    lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;      
    long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;    
    lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;   
    long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;       


    // use to different earth axis length    
    var a = 6378137.0;        // Earth Major Axis (WGS84)    
    var b = 6356752.3142;     // Minor Axis    
    var f = (a-b) / a;        // "Flattening"    
    var e = 2.0*f - f*f;      // "Eccentricity"      

    var beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));    
    var cos = Math.cos( lat1 );    
    var x = beta * cos * Math.cos( long1 );    
    var y = beta * cos * Math.sin( long1 );    
    var z = beta * ( 1 - e ) * Math.sin( lat1 );      

    beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));    
    cos = Math.cos( lat2 );   
    x -= (beta * cos * Math.cos( long2 ));    
    y -= (beta * cos * Math.sin( long2 ));    
    z -= (beta * (1 - e) * Math.sin( lat2 ));       

    var dist = Math.sqrt( (x*x) + (y*y) + (z*z) )/1000;

    this.distance = dist * 1000;

    console.log(this.distance);

  }

  reset(){
    this.latA=0;
    this.latB=0;
    this.longA=0;
    this.longB=0;

  }

  



  async getCurrentPosition() {

    if(this.btnState ==='Start Measuring'){

      

      this.btnState='Stop Measuring';

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy:true
      });
      this.latA = coordinates.coords.latitude;
      this.longA = coordinates.coords.longitude;
      console.log(`Point A lat : ${this.latA} point A long ${this.longA}`);

    }else{
      this.btnState='Start Measuring';
      const coordinate = await Geolocation.getCurrentPosition({
        enableHighAccuracy:true
      });
      this.latB = coordinate.coords.latitude;
      this.longB = coordinate.coords.longitude;
      console.log(`Point B lat : ${this.latA} point B long ${this.longA}`);

      this.calculateDistance(this.latA,this.longA,this.latB,this.longB);

    }
    
  }

}
