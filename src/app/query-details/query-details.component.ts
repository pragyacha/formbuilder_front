import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryDetailsService } from '../services/query-details.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit {
queryCommentForm: FormGroup;
	constructor(private fb: FormBuilder, private queryDetailsService: QueryDetailsService, private router: Router) { }
	
	@Input() query_id:string;
	@Input() commentsData:any;
	@Input() queryInfo={
		user_id:null,
		assign_date:null,
		action_taken:null,
		converted:null,
		user_status:null,
		comments:null,
		comment_by:null,
		admin_comments:null,
		update_status:null,
		update_status_date:null,
		remainder_date:null,
		transfer_type:null,
		assign_follow_up_date:null,
		assign_priority:null,
		assign_contact_by:null,
		profile_id:null,
		tags:null,
		website_id:null,
		other_website:null,
		open_status:null,
		open_date:null,
		escalation_mark:null,
		assign_id:null,
		username:null,
		user_name:null,
		profile_name:null,
		website_email:null,
		signature:null,
		website_name:null,
		sender_id:null,
		service_name:null,
		query_code:null,
		id:null,
		name:null,
		email_id:null,
		alt_email_id:null,
		phone:null,
		alt_contact_no:null,
		date:null,
		location:null,
		city:null,
		complete_address:null,
		designation:null,
		company_name:null,
		academic_level:null,
		remarks:null,
		status_name:{name:null,class:null},
		
	};
	//@Input() statusInfo={name:null,class:null}
	ngOnInit(){
		//this.queryCommentForm.setValue({update_status1: 6});
		
	this.queryCommentForm = this.fb.group({
      in_time: [''],
      assign_id: [''],
      query_id: [''],
      old_status: [''],
      update_status1: [''],
      remainder_date: [''],
      send_mail_type1: [''],
      send_mail_type2: [''],
      send_mail_type3: [''],
      send_mail_type4: [''],
      mail_from_email: [''],
      mail_to: [''],
      email_cc: [''],
      email_bcc: [''],
      mail_subject: [''],
      email_temp_body: [''],
      mail_signature: [''],
      sms_temp_body: [''],
      call_temp_body: [''],
      meeting_temp_body: [''],
      
    })
	}
  
showQueryDetailsData(qid): void
{
	$("#myModal").modal('show');
	this.query_id=qid;
	
	 
}  
 
	
hideModal():void {
$("#myModal").modal('hide');
}
ClickAndCheckMailType(type)
{
if($('#send_mail_type'+type).is(":checked"))   
 {
	$("#send_mail_type"+type+"Div").show();
 }
else
{
	$("#send_mail_type"+type+"Div").hide(); 
}	
}
showEmailCCBCC(type)
 {


	if(type=='cc') 
	{
	$("#ccMailDiv").slideToggle();
	}
	
	if(type=='bcc') 
	{
	$("#bccMailDiv").slideToggle();
	}
	
 }
UpdateComents()
{
const datas = this.queryCommentForm.value;	
console.log(datas);
}

ApproveTemplate(type)
{
const datas = this.queryCommentForm.value;
if(datas.mail_subject=="" && type==1)
{
alert("Please enter email subject");
document.getElementById("mail_subject").focus();
return false;		
}
else if(datas.mail_from_email=="" && type==1)
{
alert("Please enter from email id");
document.getElementById("mail_from_email").focus();
return false;		
}
else if($("#temp_body"+type).val()=="")
{
alert("Please enter template content");
document.getElementById("temp_body"+type).focus();
return false;		
}
  /*else if((type==4 || type==5) && temp_body_words < 10)
		{
		alert("Please enter minimum 10 words for template content");
		document.getElementById("temp_body"+type).focus();
		return false;	
		}*/
	  else if($("#mail_signature").val()=="" && type==1)
	  {
		alert("Please enter mail signature");
		document.getElementById("mail_signature").focus();
       return false;		
	  }
	  else
	  {
		//var approveCounter=$("#approveCounter").val();
		//var approveCounter=parseInt(approveCounter)+1;
		
	  //$("#approveCounter").val(approveCounter);
	  $("#TempShow"+type).hide();	 
	  $("#TempHide"+type).show();
	  $("#approveStatus"+type).val(1);  
	  }
	
}

}
