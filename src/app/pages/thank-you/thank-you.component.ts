import { Component, EventEmitter, Input, OnInit, Output, NgZone  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../services/form.service';
declare var Stripe: any;

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute, private zone: NgZone) {
	 
    }
formname = this.route.snapshot.params['formslug'];
  formInfo:any = {
    id:null,
    submit_success_message:null,
  };
  ngOnInit(): void {
	  this.getFormInfo(this.formname);
	  
  }
getFormInfo(slug)
{
	this.formService.getFormInfo(slug).subscribe(
			  result => {  
			 this.formInfo=result.data;
			 
			  }
			  )
}



}
