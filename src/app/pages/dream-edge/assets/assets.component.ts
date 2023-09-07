
import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import {
  NbIconLibraries, NbDialogService,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
} from '@nebular/theme';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';

import { AssetService } from '../../../shared';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  customColumn = 'Name';
  defaultColumns = ['Assets', 'DeviceID', 'Action'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  assetData: any;

  constructor(private assetService: AssetService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dialogService: NbDialogService) {
    // this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
    this.assetService.getAssets().then(data => {
      this.assetData = data;

      this.refreshTable();
    });
  }

  refreshTable() {
    this.data = this.assetData.data.floorplans.map(fp => {
      var childData: any = [];
      this.assetData.data.assets.map(asset => {
        if (fp.id == asset.asset_fp_id) {
          childData.push({
            data: {
              id: asset.id,
              Name: asset.asset_name,
              DeviceID: asset.asset_dev_id,
              kind: asset.asset_kind,
              fpId: asset.asset_fp_id,
              status: asset.asset_status == "1" ? "online" : "offline",
            }
          });
        }
      })
      return {
        data: {
          Name: fp.fp_name,
          Assets: fp.asset_on + "/" + fp.asset_cnt,
          kind: 'dir'
        },
        children: childData
      }

    });
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  data = [];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  onEditBtn(param) {
    var pObj={...param};
    this.dialogService.open(AssetDialogComponent, {
      context: {
        param: pObj,
      },
    })
      .onClose.subscribe(updateData => {
        if (updateData) {
          this.assetService.updateAsset(updateData).then(data => {
            if (data.status == 200) {
              this.assetService.getAssets().then(data => {
                this.assetData = data;
                this.refreshTable();
              });
            }
          });
        }
      });
  }
  onDelBtn(param) {
    var that = this;
    if (confirm("Are you sure to delete " + param.Name + "?")) {
      this.assetService.deleteAsset({ id: param.id }).then(data => {
        if (data.status == 200) {
          that.assetData.data.assets = that.assetData.data.assets.filter(e => e.id != param.id);
          that.refreshTable();
        }
      });
    } else {

    }

  }

  onAddBtn() {

    this.dialogService.open(AssetDialogComponent, {
      context: {
        param: null,
      },
    })
      .onClose.subscribe(addData => {
        if (addData) {
          this.assetService.addAsset(addData).then(data => {

            if (data.status == 200) {
              this.assetService.getAssets().then(data => {
                this.assetData = data;
                this.refreshTable();
              });
            }

          });
        }
      });
  }
}

@Component({
  selector: 'ngx-as-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon [ngClass]="online?'online-1':'offline'" [icon]="kind"></nb-icon>
    </ng-template>
  `,
})
export class AsIconComponent {
  @Input() kind: string;
  @Input() online: boolean;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
