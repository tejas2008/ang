import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleMapsModule } from '@angular/google-maps';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PopperPlacement, Options } from '@popperjs/core';

// import { Observable } from 'rxjs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { EventTableComponent } from './event-table/event-table.component';
import { EventsCarouselComponent } from './events-carousel/events-carousel.component';
import { FavouritesComponent } from './favourites/favourites.component';

// import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EventSearchComponent,
    EventTableComponent,
    EventsCarouselComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatSidenavModule]
})
export class AppModule { }
