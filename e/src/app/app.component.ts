import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e';
  filteredKeywords: string[] = ["T", "E", "J", "A", "S"];

  search = true;


  toggle(): void{
    this.search = !this.search;
  }
}
