import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <span [class]="classes">{{ status }}</span>
  `,
  styleUrls: ['./date.time.render.component.scss'],
})
export class DateTimeRenderComponent implements ViewCell, AfterViewInit {

  status = "Unread";
  classes = "badge-light-danger";

  @Input() value: string;
  @Input() rowData: any;

  constructor(private cdr: ChangeDetectorRef) {
    
  }

  ngAfterViewInit() {
    let date = new Date(this.value + ' UTC');
    if (this.value) {
      this.status = this.getTimeStringSince(date) + ' ago';
      this.classes = "badge-light-success";
      this.cdr.detectChanges();
    }
  }

  getTimeDifference(sinceDate) {
    var today = +new Date();
    var seconds = Math.floor((today - sinceDate) / 1000);
    return seconds;
  }

  getTimeStringSince(date) {
    var today = +new Date();
    var seconds = Math.floor((today - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m " + Math.floor(seconds % 60) + "s";
    }
    return Math.floor(seconds) + "s";
  }
}