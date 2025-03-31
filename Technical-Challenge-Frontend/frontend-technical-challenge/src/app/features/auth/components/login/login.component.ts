import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/config/services/auth.service';
import { Login } from '../../../../core/config/interfaces/login.interface';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  errorMessage?: string;

  constructor(private router: Router, private auth: AuthService, private messageService: MessageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {

  }
  
  showError(messageError: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: messageError });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.auth.authenticate(loginData).subscribe(response => {
        if (response) {
          this.router.navigateByUrl("/");
        }
        this.showError("Authentication Failed");
      }
      
    )
    } else {
      this.showError("Form Data Invalid");
    }
  }




}
