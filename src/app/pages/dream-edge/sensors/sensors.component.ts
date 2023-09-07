import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

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
  selector: 'ngx-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {
  customColumn = 'name';
  defaultColumns = [ 'sensors','firm','companyID','sensorID', 'status' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
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

  private data = [
    {
      data: { name: '71 Main Street', sensors:"2/3", kind: 'dir',},
      children: [
        { data: { name: 'kitchen', firm: 'esp32', companyID: '74', sensorID:'1', status:"offline",kind: 'wifi' } },
        { data: { name: 'bathroom', firm: 'esp32', companyID: '74', sensorID:'2', status:"online" ,kind: 'wifi'  } },
        { data: { name: 'kitchen2', firm: 'esp32', companyID: '74', sensorID:'3', status:"online",kind: 'wifi'   } },
      ],
    },
    {
      data: { name: '94 Beach Street', sensors:"1/3", kind: 'dir',},
      children: [
        { data: { name: 'kitchen', firm: 'esp32', companyID: '11', sensorID:'1', status:"offline",kind: 'wifi'  } },
        { data: { name: 'bathroom', firm: 'esp32', companyID: '11', sensorID:'2', status:"online" ,kind: 'wifi'  } },
        { data: { name: 'livingroom', firm: 'esp32', companyID: '11', sensorID:'3', status:"offline" ,kind: 'wifi'  } },
      ],
    },
    {
      data: { name: '31 Alfred Street', sensors:"3/3", kind: 'dir',},
      children: [
        { data: { name: 'kitchen', firm: 'esp32', companyID: '12', sensorID:'1', status:"online",kind: 'wifi'  } },
        { data: { name: 'bathroom', firm: 'esp32', companyID: '12', sensorID:'2', status:"online" ,kind: 'wifi'  } },
        { data: { name: 'bedroom', firm: 'esp32', companyID: '12', sensorID:'3', status:"online" ,kind: 'wifi'  } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  addSensor(){

  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon [ngClass]="online?'online-1':'offline'" [icon]="kind"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() online: boolean;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
