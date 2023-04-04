import { Component, Input } from '@angular/core';
import { EventSearchService } from '../services/event-search.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent {
  @Input() data: any;
  @Input() table: any;


  event: any = null;
  venue: any;
  artist: any;
  artistLen: any;
  albums: any;
  carousel = false;

  var_date = false;
  var_artist = false;
  var_venue = false;
  var_genre = false;
  var_price = false;
  var_ticket = false;

  constructor(private event_search_service: EventSearchService){}

  getEventDetails(id: String){
    console.log(id);
    this.event_search_service.getEventCarousel(id).subscribe((res1)=>{
      console.log(res1);
      this.event = res1[0];
      this.artist = res1[1];
      console.log(res1[1].length);
      this.artistLen = res1[1].length;
      const venue_name = res1[0][0].venue;
      console.log(venue_name);
      this.event_search_service.getVenue(venue_name).subscribe((res2)=>{
        console.log(res2);
        this.venue = res2[0];
        this.carousel = true;
      })
      
    })


    
  }
  onBack(){
    this.carousel = false;
  }
  
  
}
