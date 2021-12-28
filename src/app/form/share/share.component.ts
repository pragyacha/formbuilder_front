import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../../dashboard/services/form.service';
import {BuilderHeaderComponent} from '../builder-header/builder-header.component';
import Swal from 'sweetalert2'
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

declare var $: any;

@Component({
  providers:[BuilderHeaderComponent],
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

formname = this.route.snapshot.params['formslug'];

 elementType = NgxQrcodeElementTypes.URL;
 correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
 value:any;
 constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute) {
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
tabname: 'share'
}

 formShare={
formurl: null,
iframe: null,
hyperlink: null,
}
 
  ngOnInit(): void {
	  this.formInfo.formslug=this.formname;
	  this.getFormInfo(this.formname);
	  this.formShare.formurl=window.location.protocol+"//"+window.location.host+"/app/formperma/"+this.formname;
	  this.value=this.formShare.formurl;
	  this.formShare.iframe='<iframe frameborder="0" style="height:500px;width:99%;border:none;" src="'+this.formShare.formurl+'"></iframe>';
	  this.formShare.hyperlink="<script type='text/javascript'>function zforms_open_window(url, height, width){var leftPos = 0;var topPos = 0;if(screen){leftPos = (screen.width - width) / 2;topPos = (screen.height - height) / 2;window.open(url, null, 'width='+width+',height='+height+',left='+leftPos+',top='+topPos+', toolbar=0, location=0, status=1, scrollbars=1, resizable=1');}}</script><a href='"+this.formShare.formurl+"' title='test form ' target='_blank' onclick='zforms_open_window(this.href, 648, 700); return false'>Access Form</a>";
	  
	  
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
			 this.model.description=result.data.form_description;
			 this.model.theme.bannerImage=result.data.bannerimage;
			 this.model.theme.bgColor=result.data.bgcolor;
			 this.model.theme.textColor=result.data.textColor;
			 
			  }
			  )
}



}
