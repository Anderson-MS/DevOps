import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './LoginComponent.component.html',
  styleUrls: ['./LoginComponent.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {

    // Aqui você deve adicionar a lógica de validação das credenciais
    if (this.username === 'admin' && this.password === 'admin') {
      // Redirecionar para a página de gerenciamento de pessoas
      this.router.navigate(['/pessoas']);
    } else {
      //alert('Credenciais inválidas');
      console.log(this.username);
      console.log(this.password);
    }
  }
}
