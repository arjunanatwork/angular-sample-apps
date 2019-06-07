import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [FormsModule, AuthRoutingModule, ParticlesModule, ReactiveFormsModule]
})
export class AuthModule {}
