import { Component, Input, AfterViewInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <a [href]="'pages/mybid/'+value">{{value}}</a>
  `,
})
export class ProjectIDRenderComponent implements ViewCell {

  floorPlan = "";

  @Input() value: string;
  @Input() rowData: any;
  
  constructor() {
  }
}