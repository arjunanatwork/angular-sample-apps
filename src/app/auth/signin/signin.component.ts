import { Component, OnInit } from '@angular/core';

import particle from '../../../assets/data/particle.json';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor() {}

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
  }
}
