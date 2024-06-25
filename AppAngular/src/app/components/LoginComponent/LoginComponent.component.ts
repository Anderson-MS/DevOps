import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './LoginComponent.component.html',
  styleUrls: ['./LoginComponent.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private toastr: ToastrService,) {}

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
         this.router.navigate(['/pessoas']);
    } else {
      this.toastr.error('Senha Incorreta');
    }
  }
}
