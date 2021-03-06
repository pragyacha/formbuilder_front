
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loading = false;
  loginForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {
    this.title = 'Administrator Login';
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  onSubmit() {
	  this.loading = true;
    this.authService.login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).subscribe(
      result => {
		  
        if (result) {
          this.messageService.clear();
          this.router.navigateByUrl('/dashboard');
        }
		else
		{
		$("#messageDiv").html('<span style="color:red">Please enter correct username and password</span>');	
		}
		
		this.loading = false;
      }
    )
  }

}
