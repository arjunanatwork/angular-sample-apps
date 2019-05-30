import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'hackernews-header',
  templateUrl: './hackernews-header.component.html',
  styleUrls: ['./hackernews-header.component.css']
})
export class HackerNewsHeaderComponent implements OnInit {
  title = 'This is the Header Component';
  isMobile: boolean;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }
}
