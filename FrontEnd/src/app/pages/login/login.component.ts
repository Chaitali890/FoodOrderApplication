import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';

  constructor(private fb:FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router) {}



  ngOnInit(): void { //1
    this.loginForm = this.fb.group({
      email:['',Validators.required, Validators.email],
      password:['',Validators.required]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  //2
  get fc(){
    return this.loginForm.controls;
  }
//3
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid)return;

  
    // alert(`Email: ${this.fc.email.value},
    //        Password: ${this.fc.password.value}`)
  
    this.userService.login({email:this.fc.email.value, password:this.fc.password.value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })

  }



}
