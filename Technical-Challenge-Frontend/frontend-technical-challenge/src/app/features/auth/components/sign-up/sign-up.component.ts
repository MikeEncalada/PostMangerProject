import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../../../core/config/interfaces/signup.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/config/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup;
  errorMessage?: string;


  constructor(private router: Router, private auth: AuthService) {
    this.signUpForm= new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const signUpData: SignUp = this.signUpForm.value;
      console.log('Form Values: ', signUpData);

      this.auth.register(signUpData)
        .subscribe(response => {
            if(response){
              this.router.navigateByUrl("/");
            }
            this.errorMessage = "Register Failed";
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit(): void {
 }


}
