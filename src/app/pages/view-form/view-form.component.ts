import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { field, value } from '../global.model';
import Swal from 'sweetalert2'
import {DatePickerComponent} from 'ng2-date-picker';
import { environment } from '../../../environments/environment';

declare var $: any;
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
 success = false;
 loading = false;
 Dataloading = true;
  private apiUrl = `${environment.apiUrl}`;
  constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute) {
	 
    }
formdataInfo:any;
priceInfo:any = {
    A:1,
    B:1,
    C:1,
    page:1,
    deadline:1,
    revisions_time:1,
    plagiarism_report:1,
    additional_requirements:0,
    total_price:0,
  };
  enquiryInfo:any={
	fname:'',
	lname:'',
    email:''	
  };
formname = this.route.snapshot.params['formslug'];
selectedFile: File;
selectedImage: File;
 
  modelFields:Array<field>=[];
  model:any = {
    id:"",
    name:'',
    slug:'',
    form_header:'show',
    form_type:'',
    gatway_name:'',
    payment_proccess_url:'',
    admin_email:'',
    from_email:'',
    currency_code:'',
    description:'',
    label_placement:'top',
    theme:{
      headerbgcolor:"#494949",
      headertextcolor:"#ffffff",
      bgColor:"#ffffff",
      textColor:"#555555",
      bannerImage:""
    },
    attributes:this.modelFields
  };

  ngOnInit(): void {
	  
	  this.getFormInfo(this.formname);
	  //$('#datepicker').datepicker();
	  //console.log(this.apiUrl);
  }

getFormInfo(slug)
{
	this.formService.getFormInfo(slug).subscribe(
			  result => {  
			 console.log(result);
			 
			 this.model.id=result.data.id;
			 this.model.name=result.data.formname;
			 this.model.description=result.data.form_description;
			 this.model.label_placement=result.data.label_placement;
			 this.model.slug=result.data.slug;
			 this.model.form_header=result.data.form_header;
			 this.model.form_type=result.data.form_type;
			 this.model.submit_button_label=result.data.submit_button_label;
			 this.model.currency_code=result.data.currency_code;
			 this.model.gatway_name=result.data.gatway_name;
			 this.model.payment_proccess_url=result.data.payment_proccess_url;
			 this.model.admin_email=result.data.admin_email;
			 this.model.from_email=result.data.from_email;
			 this.model.mail_subject=result.data.mail_subject;
			 this.model.from_name=result.data.from_name;
			 this.model.mail_signature=result.data.mail_signature;
			 
			 this.formdataInfo=result.data;
			 
			 this.model.theme.headerbgcolor=result.data.headerbgcolor;
			 this.model.theme.headertextcolor=result.data.headertextcolor;
			 this.model.theme.bgColor=result.data.bgcolor;
			 this.model.theme.textColor=result.data.textColor;
			  
			 
			 this.model.attributes=result.attributes;
			 
			 this.Dataloading=false;
			 
			  }
			  )
}
  toggleValue(item){
    item.selected = !item.selected;
  }
  
  
 onFileChanged(event)
{
this.selectedFile = event.target.files[0]	
} 
  
 onImageChanged(event)
 {
	this.selectedImage = event.target.files[0] 
 } 
  
 
  
submitForm()
{

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 var Urlpattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
		if(field.type == 'name')
		{
		field.value=$("#"+field.name+"_first").val()+" "+$("#"+field.name+"_last").val();	
		this.model.attributes.value=field.value;
		}
		
      //console.log(this.model.attributes);
	  
	  //console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required  && field.type == 'name' ){
		  //alert($("#"+field.name+"_first").val());
		  if($("#"+field.name+"_first").val()==null || $("#"+field.name+"_first").val()=="")
		  {
			$("#"+field.name+"_first_error").html('Please enter first name');
            valid = false;
            return false;  
		  }
		  
		  if($("#"+field.name+"_last").val()==null || $("#"+field.name+"_last").val()=="")
		  {
			$("#"+field.name+"_last_error").html('Please enter first name');
            valid = false;
            return false;  
		  }
		  
      }
	  else if(field.required && (field.type == 'autocomplete' || field.type=='academic_level' || field.type=='document_type' || field.type=='no_of_pages' || field.type=='delivery_deadline' || field.type=='services' || field.type=='revisions_time') && (!field.value || field.value=='null'))
	  {
		$("#"+field.name+"_error").html('Please select '+field.label);
        valid = false;
        return false;  
	  }
	  else if(field.required && (!field.value || field.value==null) && field.type != 'checkbox' && field.type != 'additional_requirements'){
		  $("#"+field.name+"_error").html('Please enter '+field.label);
       // Swal.fire('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex && field.type == 'email' ){
        let regex = new RegExp(field.regex);
        if(filter.test(field.value) == false){
			$("#"+field.name+"_error").html(field.errorText);
          //Swal.fire('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
	  else if(field.required && field.regex && field.type == 'phone' ){
        let regex = new RegExp(field.regex);
        if(isNaN(field.value)){
			$("#"+field.name+"_error").html(field.errorText);
          //Swal.fire('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
	  else if(field.required && field.regex && field.type == 'website' ){
        let regex = new RegExp(field.regex);
        if(!Urlpattern.test(field.value)){
			$("#"+field.name+"_error").html(field.errorText);
          valid = false;
          return false;
        }
      }
	  else  if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
			$("#"+field.name+"_error").html(field.errorText);
          //Swal.fire('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && (field.type == 'checkbox' || field.type == 'additional_requirements')){
		 //alert(field.values.filter(r=>r.selected).length);
        if(field.values.filter(r=>r.selected).length == 0){
			$("#"+field.name+"_error").html('Please select '+field.label);
          //Swal.fire('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
	  
	 // console.log(field.label+'=>'+field.required+"=>"+field.value+"=>"+field.type);
    });
	
	//console.log('Save',this.model);
	//console.log(valid);
    if(!valid){
      return false;
    }
	 this.loading = true;
   // console.log('Save',this.model);
    let input = new FormData;
    input.append('formId',this.model.id);
	if(this.selectedFile)
   {
	 input.append('upload_files', this.selectedFile, this.selectedFile.name);
   }
   if(this.selectedImage)
   {
	 input.append('upload_image', this.selectedImage, this.selectedImage.name);
   }
    input.append('attributes',JSON.stringify(this.model.attributes))
    input.append('total_price',this.priceInfo.total_price)
    input.append('from_email',this.model.from_email)
    input.append('admin_email',this.model.admin_email)
    input.append('currency_code',this.model.currency_code)
    input.append('apiUrl',this.apiUrl)
    input.append('mail_subject',this.model.mail_subject)
    input.append('from_name',this.model.from_name)
    input.append('mail_signature',this.model.mail_signature)
	
	
	this.formService.submitUserForm(input).subscribe(
			  result => {  
			  if(this.model.form_type=='writing' || this.model.form_type=='editing')
	          {
				//this.router.navigateByUrl('/formperma/payment/'+result.data.insertId+'/'+this.model.slug); 
                window.location.href = this.model.payment_proccess_url+"?formid="+this.model.slug+"&orderid="+result.data.insertId+"&apiUrl="+this.apiUrl;				
			  }
			  else
			  {
				this.router.navigateByUrl('/formperma/thank-you/'+this.formname);
			  }
			  this.success = true;
			   this.loading = false;
			  }
			  )
	
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });	
}
 
removeError(name,type="")
{
	$("#"+name+"_error").html("");
	if(type=="fname")
	{
		this.enquiryInfo.fname=$("#"+name).val();
	}
	if(type=="lname")
	{
		this.enquiryInfo.lname=$("#"+name).val();
	}
	if(type=="email")
	{
		this.enquiryInfo.email=$("#"+name).val();
		this.clickEnquiry();
	}
}
calculatePriceMultiple(item)
  {
	item.selected = !item.selected; 
    this.calculatePrice();	
  }
calculatePrice()
{
let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
this.priceInfo.additional_requirements=0;
validationArray.reverse().forEach(field => {
			 
	
		if(field.type == 'academic_level' && field.value){
          this.priceInfo.A=this.getPriceValues(field.value,field.values);
		  $("#"+field.name+"_error").html("");
        }
		if(field.type == 'document_type' && field.value){
           this.priceInfo.B=this.getPriceValues(field.value,field.values);
		   $("#"+field.name+"_error").html("");
        }
	    if(field.type == 'services' && field.value){
           this.priceInfo.C=this.getPriceValues(field.value,field.values);	
           $("#"+field.name+"_error").html("");		   
        }
		if(field.type == 'no_of_pages' && field.value){
           this.priceInfo.page=this.getPriceValues(field.value,field.values);
           $("#"+field.name+"_error").html("");		   
        }
		if(field.type == 'delivery_deadline' && field.value){
           this.priceInfo.deadline=this.getPriceValues(field.value,field.values);
           $("#"+field.name+"_error").html("");		   
        }
		if(field.type == 'revisions_time' && field.value){
           this.priceInfo.revisions_time=this.getPriceValues(field.value,field.values);	
           $("#"+field.name+"_error").html("");		   
        }
		if(field.type == 'plagiarism_report'){
           this.priceInfo.plagiarism_report=this.getPriceValues(field.value,field.values);
           $("#"+field.name+"_error").html("");		   
        }
		if(field.type == 'additional_requirements'){
			 
            field.values.forEach(valItem => {
			if(valItem.selected==true)
			{
			this.priceInfo.additional_requirements=parseInt(this.priceInfo.additional_requirements)+parseInt(valItem.price);
			$("#"+field.name+"_error").html("");
			}
		});		  
        }
	  
    });
	console.log(this.priceInfo);
	
	if(this.model.form_type=='writing')
	{
	//Writing Calculations : A*B*C*D*E*(No of pages) + G+ (no of pages)*F
var price1=(this.priceInfo.A*this.priceInfo.B*this.priceInfo.C*this.priceInfo.deadline*this.priceInfo.revisions_time*this.priceInfo.page);
var price2=this.priceInfo.additional_requirements+(this.priceInfo.page*this.priceInfo.plagiarism_report);
this.priceInfo.total_price=Math.ceil(price1+price2);
	}
	else if(this.model.form_type=='editing')
	{
	//Writing Calculations : (A*B*C ) * D
var price1=(this.priceInfo.B*this.priceInfo.page*this.priceInfo.deadline);
var price2=this.priceInfo.C;
this.priceInfo.total_price=Math.ceil(price1*price2);
	}
}
  
getPriceValues(field_value,fields_values)
{  var price_val=1;
		  fields_values.forEach(valItem => {
			if(field_value==valItem.value)
			{
			price_val=valItem.price;
			}
		});	
		return price_val;
}  
clickEnquiry()
{
	let datas = new FormData;
	datas.append('formdata',JSON.stringify(this.formdataInfo));
	datas.append('enquiryInfo',JSON.stringify(this.enquiryInfo))
	this.formService.submitClickEnquiry(datas).subscribe(
	result => {  


	}
	)	
			  
}
}
