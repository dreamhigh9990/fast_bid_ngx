
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { AssetService, FloorplanService } from '../../../../shared';
import { SocketioService } from './../../../../shared/services/socketio.service';
@Component({
  selector: 'ngx-asset-dialog',
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent implements OnInit {
  @Input() param;

  assetData: any = {};
  fpData: any = {};
  tags: any = [];
  kinds: any = ['pricetags', 'person', 'radio', 'smartphone', 'thermometer', 'shopping-cart']
  fpName = "0";
  deviceID = "";
  assetIcon = "";
  seletedData = {
    kind: "",
    fpName: "",
    DeviceID: "",
    Name: ""
  };

  constructor(private socketService: SocketioService, private assetService: AssetService, private fpService: FloorplanService, protected ref: NbDialogRef<AssetDialogComponent>) { }
  dismiss() {
    this.socketService.disconnect();
    this.ref.close();
  }
  add_asset(assetName) {
    this.socketService.disconnect();
    if (this.param) {
      this.ref.close({ id: this.param.id, asset_name: assetName, asset_fp_id: this.fpName, asset_dev_id: this.deviceID, asset_kind: this.assetIcon, asset_status: 1 });
    } else {
      this.ref.close({ asset_name: assetName, asset_fp_id: this.fpName, asset_dev_id: this.deviceID, asset_kind: this.assetIcon, asset_status: 1 });
    }

  }
  changeFpName(selected): void {
    this.fpName = selected;
  }
  changeDeviceID(selected): void {
    this.deviceID = selected;

  }
  changeIcon(selected): void {
    this.assetIcon = selected;
  }
  ngOnInit(): void {
    // this.assetService.getAssets().then(data => {
    //   this.assetData = data;
    // });

    if (this.param) {
      this.fpName = this.param.fpId;
      this.deviceID = this.param.DeviceID;
      this.assetIcon = this.param.kind;

      this.seletedData = {
        kind: this.param.kind,
        fpName: this.param.fpId,
        DeviceID: this.param.DeviceID,
        Name: this.param.Name
      };
    }

    this.fpService.getFloorplans().then(data => {
      this.fpData = data;
    });


    this.socketService.setupSocketConnection();
    this.socketService.socket.on('initValue', (data: string) => {
      var obj = JSON.parse(data);
      this.tags = Object.entries(obj.assets);
    });
  }

}


