import { AuthService } from 'src/app/Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 
public signUpForm!: FormGroup;
type: string = 'password';
isText: boolean = false;
eyeIcon:string = "fa-eye-slash"
authservice: any;
constructor(private fb : FormBuilder, private service: AuthService, private router: Router) { }


ngOnInit() {
  this.signUpForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    userName:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required]
  })
}

hideShowPass(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
  this.isText ? this.type = 'text' : this.type = 'password'
}

onSubmit() {
  if (this.signUpForm.valid) {
    console.log(this.signUpForm.value);
    let signUpObj = {
      ...this.signUpForm.value,
      role:'',
      token:''
    }
    this.authservice.signUp(signUpObj)
    .subscribe({
      next:((res: { message: any; })=>{
        console.log(res.message);
        this.signUpForm.reset();
        this.router.navigate(['login']);
        alert(res.message)
      }),
      error:((err: { error: { message: any; }; })=>{
        alert(err?.error.message)
      })
    })
  } else {
    //ValidateForm.validateAllFormFields(this.signUpForm); //{7}
  }
}

}