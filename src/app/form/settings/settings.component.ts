import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../../dashboard/services/form.service';
import {BuilderHeaderComponent} from '../builder-header/builder-header.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
   providers:[BuilderHeaderComponent],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
loading = false;
formname = this.route.snapshot.params['formslug'];
 constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService) {
    }
  model:any = {
    id:"",
    name:'',
    slug:'',
    description:'',
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    }
  };
 
formInfo={
formslug: null,
tabname: 'settings'
} 
  
  ngOnInit(): void {
	  this.formInfo.formslug=this.formname;
	  this.getFormInfo(this.formname);
	  
	  
  }
getFormInfo(slug)
{
	this.formService.getFormInfo(slug).subscribe(
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
			 this.model.submit_button_label=result.data.submit_button_label;
			 this.model.summary_page_submit_button=result.data.summary_page_submit_button;
			 this.model.submit_success_message=result.data.submit_success_message;
			 this.model.mail_subject=result.data.mail_subject;
			 this.model.payment_subject=result.data.payment_subject;
			 
			 this.model.from_email=result.data.from_email;
			 this.model.from_name=result.data.from_name;
			 this.model.mail_signature=result.data.mail_signature;
			 
			 this.model.admin_email=result.data.admin_email;
			 this.model.form_header=result.data.form_header;
			 
			  }
			  )
}
mainFormUpdate()
{
	 this.loading = true;
	let input = new FormData;
input.append('id',this.model.id);
input.append('name',this.model.name);
input.append('description',this.model.description);
input.append('form_header',this.model.form_header);
input.append('submit_button_label',this.model.submit_button_label);
input.append('summary_page_submit_button',this.model.summary_page_submit_button);
input.append('submit_success_message',this.model.submit_success_message);
input.append('mail_subject',this.model.mail_subject);
input.append('payment_subject',this.model.payment_subject);
input.append('from_email',this.model.from_email);
input.append('from_name',this.model.from_name);
input.append('mail_signature',this.model.mail_signature);
input.append('admin_email',this.model.admin_email);
console.log(input);
this.formService.updateSettingForms(input).subscribe(
			  result => {  
			  this.toastr.success('Data save successfully', 'Success');
			   this.loading = false;
			  }
			  )

}
}
