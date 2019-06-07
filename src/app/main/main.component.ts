import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
  selectedApp: string;
  title = 'This is the Main Component';
  constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'has-navbar-fixed-top');
  }

  ngOnInit() {
    this.selectedApp = this.route.snapshot.paramMap.get('appName');
    if (this.selectedApp == null) {
      this.router.navigate(['/trello-clone']); // Default App
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.renderer.removeClass(document.body, 'has-navbar-fixed-top');
  }
}
