import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormService } from '../services/form.service';
import { Forms } from '../models/forms';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
newForm: FormGroup;
rows: Forms[] = [];
loading = false;
Dataloading = true;
currency:any;
gatway:any;
 /* pagination */
  p: number = 1;
  limit: number = 30;
  total: number;
  
  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private toastr: ToastrService) { }
   submitted = false;

	formData:any;
  
  ngOnInit(){
	  
	  this.newForm = this.fb.group({
      formname: ['', Validators.required],
      form_type: ['', Validators.required],
      form_description: [''],
      payment_gatway: [''],
      currency: ['']
    })
	
	
	this.getAllForms(this.p);
	
	  }
 getAllForms(p: number) {
	 this.Dataloading = true;
    let offset = (p - 1) * this.limit;
    this.formService.getAllForms(offset, this.limit).subscribe(
      result => {
        this.rows = result.data;
        this.total = result.total;
        this.currency = result.currency;
        this.gatway = result.gatway;
		this.Dataloading = false;
      }
    )
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getAllForms(this.p);
  }	  
	  
	  
  get f() { return this.newForm.controls; }
  onSubmit() {
	    this.loading = true;
        this.submitted = true;
        // stop here if form is invalid
        if (this.newForm.invalid)
        {
            return;
        }
        if (this.newForm.invalid==false)
		{
            const datas=this.newForm.value;
			
			this.formService.savenewforms(datas).subscribe(
			  result => {  
			  if(result.error==null)
			  {
			   $("#myModal").modal('hide');
			   this.toastr.success('Data save successfully', 'Success');
			   this.router.navigateByUrl('/dashboard/form/'+result.data.slug+'/builder');
			  }
			  else
			  {
				Swal.fire('Error',result.error,'error');  
			  }
			  this.loading = false;
			  }
			  
			  )
			
			 

        }

    }
removeForm(id)
{
    Swal.fire({
	  title: 'Are you sure?',
      text: 'Do you want to remove this form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
		this.formService.deleteForms(id).subscribe(
			  result => { 
               if(result.data.affectedRows)	
               {				   
		       this.toastr.success('Record deleted successfully', 'Success');
			   this.getAllForms(this.p);
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
}
