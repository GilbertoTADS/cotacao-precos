import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service'
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm:FormGroup = new FormGroup({
    'identifier': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)])
  });
  authFailed:boolean = false;

  constructor(
    private authenticate: AuthenticationService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.isLogged();
  }
  auth():void{
    if(!this.authForm.valid) alert('There are invalid fields');
    else this.login();
  }
  login():void{
    this.authenticate.login(
      this.authForm.get('identifier')!.value,
      this.authForm.get('password')!.value
      )
      .subscribe( (user:Supplier[]) => {
        if(user.length > 0) this.loginSuccess(user[0])
        else this.loginError();
      })
  }
  loginSuccess(user:Supplier):void {
    sessionStorage.setItem('USER',user.IDCLIFOR);
    this.router.navigateByUrl(`/home`)    
  }
  loginError():void{
    console.log('error', this.authForm.get('identifier'), this.authForm.get('password'));
    this.authFailed = true;
    setTimeout(() => {
      this.authFailed = false;
    },3000);    
  }
  isLogged(){
    if(sessionStorage.getItem('USER')) this.router.navigateByUrl(`/home`);
  }
}
