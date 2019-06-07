import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleMenu = false;

  constructor(private auth: AuthService) {}

  signOut() {
    this.auth.signOut();
  }

}
