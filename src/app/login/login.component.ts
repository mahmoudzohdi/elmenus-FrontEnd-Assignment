import { Component, OnInit, ElementRef } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.model';
import { LoginService } from './login.service';
import { PermissionService } from "../shared/permission/permission.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	host: {
    '(document:click)': 'clickOutside($event)',
  }
})
export class LoginComponent implements OnInit {
	public showLogin: boolean = false;
	public loginForm: FormGroup;
	private userData: User;
	private authError: boolean = false;
	private islogin: boolean = false;
  constructor(private _eref: ElementRef, private fb: FormBuilder, private login: LoginService, private permission: PermissionService) {
		this.loginForm = fb.group({
            username : ["", Validators.required],
            password : ["", Validators.required]
        });
	}

  ngOnInit() {
	}
	
	private toggleLogin(){
		this.showLogin = !this.showLogin;
	}

	private clickOutside(event) {
   if (!this._eref.nativeElement.contains(event.target)) // or some similar check
     this.showLogin = false;
	}
	private onSubmit(){
		this.login.userAuth(this.loginForm.value).subscribe((res)=>{
			res.length ? (this.authError = false, this.islogin = true, this.userData = res[0]) : this.authError = true;
			this.permission.checkIsAdmin(this.userData.role);
		});
	}
	private logout(){
		this.islogin = false;
		this.permission.checkIsAdmin(false);
	}

}
