import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }
  
  @Input() formInfo={
	  formslug:null,
	  tabname:null,
  }
 
   ngOnInit(): void {
//console.log(this.formInfo);
  }
 backClicked() {
    this.location.back(); 
  } 
}
