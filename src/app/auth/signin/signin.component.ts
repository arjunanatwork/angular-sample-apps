import { Component, OnInit } from '@angular/core';

import particle from '../../../assets/data/particle.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../auth.service.js';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.css']
})
export class SigninComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  userForm: FormGroup;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  signin() {
    const user = new User();
    user.email = this.userForm.value.email;
    user.password = this.userForm.value.password;
    this.auth.emailSignIn(user);
  }

  googleSignIn() {
    this.auth.googleLogin();
  }

  githubSignIn() {
    this.auth.githubLogin();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    // tslint:disable-next-line: forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line: forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit() {
    this.myStyle = {
      height: '100vh',
      'background-color': '#3273dc',
      '-webkit-box-shadow': 'inset 24px 4px 64px -24px rgba(71, 71, 71, 1)',
      '-moz-box-shadow': 'inset 24px 4px 64px -24px rgba(71, 71, 71, 1)',
      'box-shadow': 'inset 24px 4px 64px -24px rgba(71, 71, 71, 1)',
      padding: '0px'
    };

    this.myParams = particle.partJson;
    this.buildForm();

  }
}
