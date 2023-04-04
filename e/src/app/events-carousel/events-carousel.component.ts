import { Component, EventEmitter, Input, Output } from '@angular/core';

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-events-carousel',
  templateUrl: './events-carousel.component.html',
  styleUrls: ['./events-carousel.component.css']
})
export class EventsCarouselComponent {
  show = false;

  @Input() event: any;
  @Input() venue: any;
  @Input() artist: any;
  @Input() artistLen: any;
  @Output() back: EventEmitter<void> = new EventEmitter();  

  matoptions: google.maps.MapOptions;
  marker: any;
  favo =  true;
  
  mode: ProgressSpinnerMode= 'determinate';
  color: ThemePalette = 'warn';
  // atlng: any = '';
    display: string = 'none';
  ngOnInit(): void{
    // console.log(this.venue.loc.lat);
    
    this.matoptions = {
      center: {lat: Number(this.venue.loc.lat), lng: Number(this.venue.loc.lng)},
      zoom: 14
    }
    console.log(this.matoptions);
    

    this.marker = {
      position: {lat: Number(this.venue.loc.lat), lng: Number(this.venue.loc.lng)},
    }

    console.log(this.matoptions);
    this.favo = true;
    
    

  if (localStorage.getItem(this.event[0].name)) {
    this.favo = false;
  }


    
  }

  openModal(){
    this.display= 'block'
  }
  close(){
    this.display = 'none'
  }

  onBack() {
    this.back.emit();
  }

  addFav(e: any){
    console.log(e);
    var temp = {'date': '', 'genre': '', 'name': '', 'venue': ''};
    var res = [];
    temp['date'] = '';
    try{
    temp['date'] = e.date.split(" ")[0];
    }
    catch(err){
      console.log(err);
      temp['date'] = e.date;
    }

    temp['genre'] = e.genre;

    temp['name'] = e.name;

    temp['venue'] = e.venue;

    res.push(temp);

    if(this.favo){
      console.log(1);
      
      this.favo = false;
      localStorage.setItem(e.name, JSON.stringify(temp)); 
      alert("Added to favourites!");
    }

    else{
      this.favo = true;
      localStorage.removeItem(e.name);
      alert("Removed from favourites!");

 }

    
  }
}


