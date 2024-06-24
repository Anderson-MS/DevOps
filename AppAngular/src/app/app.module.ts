import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PessoasService } from './pessoas.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/LoginComponent/LoginComponent.component';
import { FormsModule } from '@angular/forms'; // Importe FormsModule

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ],
  providers: [HttpClientModule ,
    PessoasService,
    provideAnimations(),
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
