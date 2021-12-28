import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../global.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../../dashboard/services/form.service';
import {BuilderHeaderComponent} from '../builder-header/builder-header.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
 providers:[BuilderHeaderComponent],
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
Dataloading = true;
FormDataloading = true;
loading = false;
  value:value={
    label:"",
    value:"",
    price:"",
  };
changeText: boolean;
  success = false;
  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your text",
      "placeholder": "Enter your text",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
	  "field_size" : 9,
	  "required":true,
      "handle":true
    },
	{
      "type": "name",
      "icon": "fa-user",
      "label": "Name",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
	  "field_size" : 9,
	  "required":true,
	  "handle":true
      
    },
	{
      "type": "website",
      "icon": "fa-globe",
      "label": "Website",
      "description": "Enter website name",
      "placeholder": "Enter website name",
      "className": "form-control",
      "subtype": "text",
	  "field_size" : 9,
	  "required":true,
      "regex" : "/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi",
	  "errorText": "Please enter a valid website",
      "handle":true
    },
	{
      "type": "rating",
      "icon": "fa-star",
      "label": "Rating",
      "description": "Rating",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
	  "required":true,
	  "field_size" : 9,
      "handle":true
    },
	{
	  "type": "heading",
      "icon": "fa-list",
      "label": "Section",
      "description": "My Title",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
	  "field_size" : 9,
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
	  "field_size" : 9,
	  "required":true,
      "handle":true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
	  "field_size" : 9,
      "value": "20",
	  "required":true,
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
	  "required":true,
	  "field_size" : 9,
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
	  "field_size" : 9,
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
	  "field_size" : 9,
	  "required":true,
      "label": "Textarea"
    },
	{
      "type": "textarea",
      "icon":"fa-text-width",
	  "field_size" : 9,
	  "required":true,
      "label": "Description" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph",
	  "field_size" : 12,
	  "required":false,
      "placeholder": "Type your text to display here only" 
    },
    {
      "type": "checkbox",
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
	  "field_size" : 12,
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
	  "field_size" : 9,
      "className": "form-control",
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon":"fa-upload",
      "label": "File Upload",
      "className": "form-control",
	  "required":false,
	  "field_size" : 12,
      "subtype": "file"
    },
	{
      "type": "image",
      "icon":"fa-image",
      "label": "Image Upload",
      "className": "form-control",
	  "required":false,
	  "field_size" : 12,
      "subtype": "file"
    },
	{
      "type": "academic_level",
      "icon":"fa-bars",
      "label": "Academic Level",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "PhD",
          "value": "PhD",
          "price": 1.1
        },
        {
          "label": "Masters",
          "value": "Masters",
          "price": 1
        }
      ]
    },
	{
      "type": "document_type",
      "icon":"fa-bars",
      "label": "Document Type",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "PhD Document",
          "value": "PhD Document",
          "price": 1.1
        },
        {
          "label": "Journal Manuscript",
          "value": "Journal Manuscript",
          "price": 1
        }
      ]
    },
	{
      "type": "no_of_pages",
      "icon":"fa-bars",
      "label": "No. of Pages",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "1 Page(s) / 250 Words",
          "value": "1 Page(s) / 250 Words",
          "price": 1
        },
        {
          "label": "2 Page(s) / 500 Words",
          "value": "2 Page(s) / 500 Words",
          "price": 2
        }
      ]
    },
	{
      "type": "delivery_deadline",
      "icon":"fa-bars",
      "label": "Delivery Deadline",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "1-3 days",
          "value": "1-3 days",
          "price": 1
        },
        {
          "label": "4-6 Days",
          "value": "4-6 Days",
          "price": 4
        },
		{
		 "label": "7-10 Days",
		 "value": "7-10 Days",
		 "price": 7,
		},
		{
		 "label": "11-15 Days",
		 "value": "11-15 Days",
		 "price": 11,
		},
		{
		 "label": "Above 15 days",
		 "value": "Above 15 days",
		 "price": 15
		}
      ]
    },
	{
      "type": "services",
      "icon":"fa-bars",
      "label": "Type of Service",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "Writing",
          "value": "Writing",
          "price": 1
        },
        {
          "label": "Writing + Consultation",
          "value": "Writing + Consultation",
          "price": 2
        },
		{
		 "label": "Review and Guidance",
		 "value": "Review and Guidance",
		 "price": 3
		}
      ]
    },
	{
      "type": "revisions_time",
      "icon":"fa-bars",
      "label": "Revisions Time",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "Standard - 14 days",
          "value": "Standard - 14 days",
          "price": 1
        },
        {
          "label": "30 days - 10% Extra",
          "value": "30 days - 10% Extra",
          "price": 2
        },
		{
		 "label": "60 days - 15% Extra",
		 "value": "60 days - 15% Extra",
		 "price": 3
		},
		{
		 "label": "90 days - 20% Exrta",
		 "value": "90 days - 20% Exrta",
		 "price": 4
		}
      ]
    },
    {
      "type": "plagiarism_report",
      "icon":"fa-list-ul",
      "label": "Plagiarism Report",
      "description": "Plagiarism Report",
	  "required":true,
	  "value":"No",
      "values": [
        {
          "label": "Yes",
          "value": "Yes",
		  "price": 1
        },
        {
          "label": "No",
          "value": "No",
		  "price": 2
        }
      ]
    },
	{
      "type": "additional_requirements",
      "icon":"fa-bars",
      "label": "Additional Requirements",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "Data Analysis using SPSS",
          "value": "Data Analysis using SPSS",
          "price": 1
        },
        {
          "label": "Data Analysis using AMOS",
          "value": "Data Analysis using AMOS",
          "price": 2
        },
		{
		 "label": "Data Analysis using STATA",
		 "value": "Data Analysis using STATA",
		 "price": 3
		},
		{
		 "label": "Data Analysis using EViews",
		 "value": "Data Analysis using EViews",
		 "price": 4
		},
		{
		 "label": "Data Analysis using Nvivo",
		 "value": "Data Analysis using Nvivo",
		 "price": 4
		},
		{
		 "label": "Implementation using Matlab",
		 "value": "Implementation using Matlab",
		 "price": 4
		},
		{
		 "label": "Implementation using Python",
		 "value": "Implementation using Python",
		 "price": 4
		},
		{
		 "label": "Implementation using Java",
		 "value": "Implementation using Java",
		 "price": 4
		}
      ]
    }
	
  ];

  modelFields:Array<field>=[];
  model:any = {
    id:"",
    name:'',
    slug:'',
    description:'',
    form_type:'',
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

  report = false;
  reports:any = [];
formname = this.route.snapshot.params['formslug'];
  constructor(private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService) {
    }
formslug:any;

formInfo={
formslug: null,
tabname: 'builder'
}

itemInfo={
className: null,
description: null,
errorText: null,
form_id: null,
handle: null,
icon: null,
id: null,
label: null,
max: null,
min: null,
name: null,
placeholder:null,
regex: null,
required: null,
subtype: null,
toggle: null,
type: null,
value: null,
field_size: null,
visibility_status: null,
values: [{label:"",value:""}]
}
  ngOnInit() {
    // this.route.params.subscribe( params =>{
    //   console.log(params);
    //   this.us.getDataApi('/admin/getFormById',{id:params.id}).subscribe(r=>{
    //     console.log(r);
    //     this.model = r['data'];
    //   });
    // });


    // this.model = this.cs.data; 
    // console.log(this.model.data);
     //console.log(this.formname);
	//console.log(this.model);
	 this.changeText = false;
	 this.formInfo.formslug=this.formname;
	 this.getFormInfo(this.formname);
   }

getFormInfo(slug)
{
	this.Dataloading = true;
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
			 this.model.form_type=result.data.form_type;
			 this.model.label_placement=result.data.label_placement;
			 this.model.theme.bannerImage=result.data.bannerimage;
			 this.model.theme.bgColor=result.data.bgcolor;
			 this.model.theme.textColor=result.data.textColor;
			 this.model.theme.headerbgcolor=result.data.headerbgcolor;
			 this.model.theme.headertextcolor=result.data.headertextcolor;
			 
			 this.model.attributes=result.attributes;
			 this.Dataloading = false;
			  }
			  )
}

  onDragStart(event:DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
	this.updateForm();
  }
  
  onDraggableCopied(event:DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
	console.log("onDragged");
	
	this.updateForm();
  }
      
  onDragCanceled(event:DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'_'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
	
	
  }

  addValue(values){
	//console.log(this.value);
	values.push(this.value);
	//this.itemInfo.values=values;
    this.value={label:"",value:""};
  }

  removeField(i,at_id){
	  
    Swal.fire({
	  title: 'Are you sure?',
      text: 'Do you want to remove this field?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        //this.model.attributes.splice(i,1);
		this.formService.deleteBuilderFormsField(at_id).subscribe(
			  result => {  
			  this.model.attributes.splice(i,1);
			  }
			  )
      }
    });

  }
mainFormUpdate()
{
	this.loading = true;
	let input = new FormData;
input.append('id',this.model.id);
input.append('name',this.model.name);
input.append('description',this.model.description);
input.append('label_placement',this.model.label_placement);
input.append('bannerImage',this.model.theme.bannerImage);
input.append('bgColor',this.model.theme.bgColor);
input.append('textColor',this.model.theme.textColor);
input.append('headerbgcolor',this.model.theme.headerbgcolor);
input.append('headertextcolor',this.model.theme.headertextcolor);

this.formService.updateMainForms(input).subscribe(
			  result => {  
			 this.toastr.success('Data save successfully', 'Success');
			 this.loading = false;
			  }
			  )

}
  updateForm(){
    let input = new FormData;
    input.append('id',this.model.id);
    input.append('name',this.model.name);
    input.append('slug',this.model.slug);
    input.append('description',this.model.description);
    input.append('label_placement',this.model.label_placement);
    input.append('bannerImage',this.model.theme.bannerImage);
    input.append('bgColor',this.model.theme.bgColor);
    input.append('textColor',this.model.theme.textColor);
    input.append('attributes',JSON.stringify(this.model.attributes));

	if(this.model.attributes!="")
	{
	this.formService.saveBuilderForms(input).subscribe(
			  result => {  
			  this.getFormInfo(this.formname);
			  }
			  )
	}
    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }
editFieldInfo(i,f_id)
{
this.FormDataloading=true;	
if(this.model.attributes!="")
	{
	this.formService.editFormFieldInfo(f_id).subscribe(
			  result => {  
			  this.itemInfo=result.attributes;
			  this.FormDataloading=false;
			  }
			  )
	}	
}
SubmitEditFormField()
{
	 this.loading = true;
    if(this.itemInfo.label==null || this.itemInfo.label=="")
    {
		Swal.fire('Error','Please enter label','error');
    }
	else
	{
		this.formService.saveEditBuilderFormsField(this.itemInfo).subscribe(
			  result => {  
			  this.getFormInfo(this.formname);
			  this.toastr.success('Data save successfully', 'Success');
			  this.loading = false;
			  }
			  )
		
	}
	 
}
  initReport(){
    this.report = true; 
    let input = {
      id:this.model.id
    }
    // this.us.getDataApi('/admin/allFilledForms',input).subscribe(r=>{
    //   this.reports = r.data;
    //   console.log('reports',this.reports);
    //   this.reports.map(records=>{
    //     return records.attributes.map(record=>{
    //       if(record.type=='checkbox'){
    //         record.value = record.values.filter(r=>r.selected).map(i=>i.value).join(',');
    //       }
    //     })
    //   });
    // });
  }



  toggleValue(item){
    item.selected = !item.selected;
  }

  submit(){
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required && !field.value && field.type != 'checkbox'){
        Swal.fire('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
          Swal.fire('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && field.type == 'checkbox'){
        if(field.values.filter(r=>r.selected).length == 0){
          Swal.fire('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
    });
    if(!valid){
      return false;
    }
    console.log('Save',this.model);
    let input = new FormData;
    input.append('formId',this.model.id);
    input.append('attributes',JSON.stringify(this.model.attributes))
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });
  }
  
 
}

