import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSearchComponent } from './event-search/event-search.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {path:'',redirectTo:'/search', pathMatch:'full'},
  { path: 'search', component: EventSearchComponent },
  { path: 'favourites', component: FavouritesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
