import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../../dashboard/services/form.service';
import { environment } from '../../../environments/environment';
import { Forms } from '../models/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from '../../services/export.service';
import { ExcelJson } from '../../interfaces/excel-json.interface';
//import { User } from './interfaces/user.interface';

declare var $: any;

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
 term: string;
 search_date="all";
 Dataloading = true;
formname = this.route.snapshot.params['formslug'];
apiUrl = `${environment.apiUrl}/`;

@ViewChild('recordTable') recordTable: ElementRef;

rows: Forms[] = [];
 /* pagination */
  p: number = 1;
  limit: number = 30;
  total: number;
  masterSelected:boolean;
  checklist:any;
  checkedList:any; 
  

 constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService, private exportService: ExportService, private location: Location) {
	 this.masterSelected = false;
    }
products = [];
  model:any = {
    id:"",
    name:'App name...',
    slug:'',
    description:'App Description...',
    currency_code:'',
    form_type:'',
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    }
  };
 attributes:any;
 datavalues:any;
  toBeDeleted = [];
  ngOnInit(): void {
	  // this.getFormSubmittedDetails(this.formname);
	    this.getFormRecordInfo(this.formname);
  }

/*
checkUncheckAll() {
    for (var i = 0; i < this.rows.length; i++) {
      this.rows[i].isSelected = this.masterSelected;
    }
  }
  isAllSelected() {
    this.masterSelected = this.rows.every(function(item:any) {
        return item.isSelected == true;
      })
  }
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.rows.length; i++) {
      if(this.rows[i].isSelected)
      this.checkedList.push(this.rows[i].id);
    }
    //this.checkedList = JSON.stringify(this.checkedList);
	console.log(this.checkedList);
  }
*/
 getFormRecordInfo(slug)
{
	this.formService.getFormRecordInfo(slug).subscribe(
			  result => {  
			 //console.log(result);
			 if(result==null)
			 {
				 this.router.navigateByUrl('/dashboard');
			 }
			 else if(result.data==undefined)
			 {
				 this.router.navigateByUrl('/dashboard');
			 }
			 this.model.id=result.data.id;
			 this.model.name=result.data.formname;
			 this.model.currency_code=result.data.currency_code;
			 this.model.form_type=result.data.form_type;
			 this.attributes=result.attributes;
			 this.getFormSubmittedDetails(slug,this.p);
			 
			  }
			  )
}
getFormSubmittedDetails(slug,p: number)
{
	this.Dataloading = true;
	 let offset = (p - 1) * this.limit;
	this.formService.getFormSubmittedDetails(slug,offset, this.limit,this.search_date).subscribe(
			  result => {  
			 //console.log(result);
			 if(result==null)
			 {
				 this.router.navigateByUrl('/dashboard');
			 }
			 else if(result.data==undefined)
			 {
				 this.router.navigateByUrl('/dashboard');
			 }
			 this.rows = result.data;
             this.total = result.total;
			 this.Dataloading = false;
 
			  }
			  )	
}

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getFormSubmittedDetails(this.formname,this.p);
  }	
changeDateFilter()
{
 this.getFormSubmittedDetails(this.formname,this.p);	
}
changeSetLimitFilter()
{
this.p=1;	
 this.getFormSubmittedDetails(this.formname,this.p);	
}
deleteRecord(id: number)
{
 Swal.fire({
	  title: 'Are you sure?',
      text: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
		this.formService.deleteUserSubmittedRecords(id).subscribe(
			  result => { 
               if(result.data.affectedRows)	
               {				   
		       this.toastr.success('Record deleted successfully', 'Success');
			   this.rows = this.rows.filter(item => item.id != id)
			   this.total = this.total-1;
			   }
			   else
			   {
				this.toastr.error(result.error, 'Error');   
			   }
			  
			  }
			  )
      }
    });	
	
 	
}
 exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.recordTable, this.model.name+"-export-excel-report");
  }
  
   /**
   * Funtion prepares data to pass to export service to create csv from Json
   *
   */
  exportToCsv(): void {
    this.exportService.exportToCsv(this.rows, this.model.name, ['id', 'firstName', 'lastName', 'handle']);
  } 
 
 backClicked() {
    this.location.back(); 
  } 
  
}
