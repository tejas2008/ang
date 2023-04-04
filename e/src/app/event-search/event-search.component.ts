import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { EventSearchService } from '../services/event-search.service';




@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})


export class EventSearchComponent {
  constructor(private event_search_service: EventSearchService, private fb: FormBuilder) { }
  
  filteredOptions: any;
  table = false;
  results: any;
  record = false;
  read = false;
  loc_status = true;
  isLoading = false;
  searchkeyword = new FormControl();
  location = new FormControl();
  selectedKeyword: any = "";
  errorMsg!: string;
  minLengthTerm = 3;

  // formkey = this.fb.group({
  //   keyword: '',
  // })


  ngOnInit(): void {

   this.searchkeyword.valueChanges
    .pipe(
    startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.isLoading = true)),
      switchMap(value => 
      this.event_search_service.getautoComplete(value).pipe(
            finalize(() => (this.isLoading = false))
          )
      )).subscribe((data: any) =>{
        console.log(data);
        this.filteredOptions = data.data._embedded.attractions;
        console.log(this.filteredOptions);
      })
    // .pipe(
    //   filter(res => {
    //     console.log(res)
    //     return res !== null
    //   }),
    //   distinctUntilChanged(),
    //   debounceTime(500),
    //   tap(() => {
    //     this.errorMsg = "";
    //     this.filteredKeywords = [];
    //     this.isLoading = true;
    //   }),
    //   switchMap(value => this.event_search_service.getautoComplete(value)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // ).subscribe((data: any) => {
    //   console.log(data);
    //   const keywordObject = data.data;
    //   console.log(keywordObject);
      
    //   if(keywordObject==undefined){
    //       this.errorMsg="";
    //       this.filteredKeywords=[]
    //   }
    //   else{
    //     this.errorMsg="";
    //     this.filteredKeywords=keywordObject;
    //   }
    //   console.log(this.filteredKeywords);
    // });
}


  onSelected() {
    console.log(this.selectedKeyword);
    this.selectedKeyword = this.selectedKeyword;
  }


  displayWith(value: any) {
    return value.name;
  }

  EnableDisable(){
    console.log("Enable Disable");
    const loc = document.getElementById("loc") as HTMLInputElement;
    console.log(loc);
    const checkbox = document.getElementById("auto_check") as HTMLInputElement;
    console.log(checkbox.checked);
    if(checkbox.checked){
      loc!.value = '';
      loc!.disabled = true;
    }
    else{
      loc!.disabled = false;
    }

    console.log(loc);

  }

    onClickSubmit(data: { keyword: string; distance: string; location: string; category: string; }) {
    console.log("Entered Email id : " + data.keyword);
    console.log("Entered Email id : " + data.distance);
    console.log("Entered Email id : " + data.location);
    console.log("Entered Email id : " + data.category);
    this.record = false;
    this.results = [];
    if(data.distance === ""){
      data.distance = '10';
    }

    data.keyword = this.searchkeyword.value;
    // data.location = this.location.value;

    const checkbox = document.getElementById("auto_check") as HTMLInputElement;
    console.log("Hi");  
    if(checkbox.checked){
      
      this.event_search_service.getipinfo().subscribe((res1) =>{
        console.log(res1);
        var cord = res1.loc.split(",");

        this.event_search_service.getEvents(data, cord[0], cord[1]).subscribe((res2: any)=>{
          console.log("data recieved to table formtend");
          console.log(res2.length);
          console.log(res2);
          if(res2.length > 0){
            console.log('true');
          this.table = true;
          }
          else{
            console.log('false');
            this.table = false;
            this.record = true;
          }
          this.results = res2;
        })
        
      })
        
    }
    else{
      this.event_search_service.gmapsApi(data.location).subscribe((res3)=>{
        console.log(res3);
        const cord = res3.results[0].geometry.location;
        const lat = cord.lat;
        const lng = cord.lng;

        this.event_search_service.getEvents(data, lat, lng).subscribe((res2: any)=>{
          console.log("data recieved to table formtend");
          console.log(res2.length);
          console.log(res2);
          if(res2.length > 0){
            console.log('true');
          this.table = true;
          }
          else{
            console.log('false');
            this.table = false;
            this.record = true;
          }
          this.results = res2;
        })
      })
      
    }
 }

  clear(){
    console.log('in clear');
    this.table = false;
    this.results = [];
  }

}
