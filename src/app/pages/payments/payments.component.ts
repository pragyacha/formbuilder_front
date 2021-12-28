import { Component, EventEmitter, Input, OnInit, Output, NgZone  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormControl,EmailValidator  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { WindowRefService } from '../services/window-ref.service';
declare var Stripe: any;
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [WindowRefService]
})
export class PaymentsComponent implements OnInit {
handler:any = null;
Dataloading=true;
constructor(private winRef: WindowRefService, private formBuilder: FormBuilder, private formService: FormService, private router: Router,private route: ActivatedRoute, private zone: NgZone) {
	 
    }
formname = this.route.snapshot.params['formslug'];
id = this.route.snapshot.params['id'];
success = false;
stripToken:any;
  formInfo:any = {
    id:null,
    name:null,
    slug:null,
    form_header:null,
    form_type:null,
    currency_code:null,
    gatway_name:null,
    description:null,
    theme:null
  };
  
  orderInfo:any = {
	  id:null,
	  form_id:null,
	  order_id:null,
	  data_value:null,
	  total_price:null,
	  dates:null,
	  submitted_date:null,
	  name:null,
	  phone:null
  }
  
  orderDetails:any;

  ngOnInit(): void {
	  this.getFormInfo(this.formname,this.id);
	 //this.successShow();
	/*  
	// Your Stripe public key
    const stripe = Stripe('pk_test_123456123456123456');

    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');
    card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Listen for form submission, process the form with Stripe,
    // and get the 
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      stripe.createToken(card).then(result => {
		  console.log(result);
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);
        }
      });
    });
	 */ 
	 
	// this.payWithRazor('')
  }
getFormInfo(slug,id)
{
	this.formService.getFormOrderInfo(slug,id).subscribe(
			  result => {  
			 this.formInfo=result.data;
			 this.orderInfo=result.orderData;
			 this.orderDetails=JSON.parse(this.orderInfo.data_value);
			 this.Dataloading=false;
			 this.orderDetails.forEach(field => {
				 if(field.type == 'name' && field.value){
					  this.orderDetails.name=field.value;
					}
				 });
			   if(this.formInfo.vendor_name=="strip")
				{
					 this.loadStripe();
				}
			
			  }
			  )
}
submitPayButton()
{
if(this.formInfo.vendor_name=="razorpay")
{
	this.payWithRazor();
}
else if(this.formInfo.vendor_name=="strip")
{
	this.payWithStrip(this.formService,this.orderInfo,this.zone, this.router,this.formname);
}
}
 

  payWithRazor() {
    const options: any = {
      key: this.formInfo.gatway_api,
      amount: this.orderInfo.total_price*100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: this.formInfo.currency_code,
      name: this.orderDetails.name, // company name or product name
      description: this.formInfo.order_desc,  // product description
      image: this.formInfo.image_logo, // company logo or product image
      order_id: '', // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      //console.log(response);
     // console.log(options);
	  if(response.razorpay_payment_id)
	  {
		  this.formService.SavePaymentStatus(this.orderInfo.id,"Paid").subscribe(
			  result => { 
				  if(result.data.affectedRows > 0)
				  {
					  this.zone.run(() => {
					  this.router.navigate(['/formperma/thank-you/'+this.formname]);
					  });
				  }
			  }
			  )
			  
		  	
	  }
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
	  this.formService.SavePaymentStatus(this.orderInfo.id,"Cancelled").subscribe(
			  result => { 
				  if(result.data.affectedRows > 0)
				  {
                    console.log("Transaction cancelled.");
				  }
			  }
			  )
 
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
 
 payWithStrip(formService,orderInfo,zone,router,slug) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: this.formInfo.gatway_api,
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        
		//console.log(token.id);
		 if(token.id)
	  {
		  formService.SavePaymentStatus(orderInfo.id,'Paid').subscribe(
			  result => { 
               			  
				  if(result.data.affectedRows > 0)
				  {
                    router.navigate(['/formperma/thank-you/'+slug]);
				  }
			  }
			  )	
	  }
        //alert('Token Created!!');
      }
    });
 	
 
    handler.open({
      name: this.orderDetails.name,
      description: this.formInfo.order_desc,
      amount: this.orderInfo.total_price * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: this.formInfo.gatway_api,
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
 
}
