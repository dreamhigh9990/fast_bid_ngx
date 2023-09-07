import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <span [class]="classes"></span>
  <span class="fs-7 fw-bold text-muted">{{ status }}</span>
  `,
  styleUrls: ['./active.time.render.component.scss'],
})
export class ActiveTimeRenderComponent implements ViewCell, AfterViewInit {

  status = "Active";
  classes = "badge badge-success badge-circle";

  @Input() value: string;
  @Input() rowData: any;

  constructor(private cdr: ChangeDetectorRef) {
    
  }

  ngAfterViewInit() {
    let date = new Date(this.value + ' UTC');
    if (this.value) {
      if (this.getTimeDifference(date) >= 3 * 60) { // older than 3 minutes
        this.status = this.getTimeStringSince(date) + ' ago';
        this.classes = "badge badge-danger badge-circle";
        this.cdr.detectChanges();
      }
    } else {
      this.status = "Never";
      this.classes = "badge badge-danger badge-circle";
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
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes " + Math.floor(seconds % 60) + " seconds";
    }
    return Math.floor(seconds) + " seconds";
  }
}