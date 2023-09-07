import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'ngx-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent implements OnInit {
  @Input() param;
  constructor(protected ref: NbDialogRef<DetailDialogComponent>) { }
  dismiss() {
    this.ref.close();
  }
  ngOnInit(): void {
  }

}
