import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:any;
  password:any;

  constructor(public router: Router , public service:AuthServiceService) {

  }

  signIn() {
    this.service.login(this.username ,this.password).subscribe((res:any)=>{
      console.log(res)
      localStorage.setItem('token', res.token);
      this.router.navigate(['/careunit'])
    })

  }}
