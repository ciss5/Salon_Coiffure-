import { Component, AfterViewInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private scroller: ViewportScroller
  ) {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scroller.scrollToAnchor(fragment);
      }
    });
  }
}
