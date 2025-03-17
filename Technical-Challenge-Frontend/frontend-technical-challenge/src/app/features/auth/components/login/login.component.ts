import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/config/services/auth.service';
import { Login } from '../../../../core/config/interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  

  loginForm: FormGroup;
  errorMessage?: string;

  constructor(private router: Router, private auth: AuthService) {
    this.loginForm= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    
  }

  ngOnInit(): void {
   
 }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      console.log('Form Values: ', loginData);

      this.auth.authenticate(loginData).subscribe(response =>{
        if(response){
          this.router.navigateByUrl("/");
        }
        this.errorMessage = "Authentication Failed";
      })
    } else {
      this.errorMessage = "Form Data Invalid"
    }
  }


}
