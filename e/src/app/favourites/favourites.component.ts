import { Component } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  table = true;
  results = [];
  ngOnInit(): void{
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    for(let i = 0; i<values.length;i++){
      if(values[i]!=null){
        const val = values[i]
        values[i] = JSON.parse(val)
      }
    }

    console.log(values)
    this.results = values
    if(this.results.length>0){
      this.table = true;
    }
    else{
      this.table =false;
    }
  }

  deleteEvent(name: any){
    this.results = this.results.filter((i: any) => i.name !== name)
    localStorage.removeItem(name);
    if(this.results.length>0){
      this.table = true;
    }
    else{
      this.table = false;
    }
    alert("Removed from favorites!");
  }

}
