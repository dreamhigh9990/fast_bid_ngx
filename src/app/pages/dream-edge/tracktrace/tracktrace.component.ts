import { SocketioService } from './../../../shared/services/socketio.service';

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import {
  NbIconLibraries, NbDialogService,
  NbToastrService,
  NbToastrConfig,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbComponentStatus,
} from '@nebular/theme';
interface anyObject {
  [key: string]: any
}
@Component({
  selector: 'ngx-tracktrace',
  templateUrl: './tracktrace.component.html',
  styleUrls: ['./tracktrace.component.scss']
})
export class TracktraceComponent implements AfterViewInit {
  positions: any = {
    // 'laurence_bathroom': {
    //   name: 'Bathroom',
    //   posX: 83.1,
    //   posY: 79.2,
    //   status: false,
    // },
    // 'kitchen': {
    //   name: 'Kitchen',
    //   posX: 64.5,
    //   posY: 89.4,
    //   status: true,
    // },
    // 'lounge': {
    //   name: 'Lounge',
    //   posX: 43.2,
    //   posY: 42.9,
    //   status: true,
    // },
    'kitchen_cburst': {
      name: 'Kitchen',
      posX: 81.2,
      posY: 31.9,
      status: true,
    },
    'office_cburst': {
      name: 'Office',
      posX: 43.2,
      posY: 51.9,
      status: true,
    },
    'board_room_cburst': {
      name: 'BoardRoom',
      posX: 13.2,
      posY: 85.9,
      status: true,
    },
    'resident_room_cburst': {
      name: 'ResidentRoom',
      posX: 41.2,
      posY: 88.9,
      status: true,
    },
  };

  assets: anyObject[] = [
  ];

  devices: any = {};
  status: any = {};
  tags: any = {};
  names: any = {
    // 'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-4': { name: 'Food Trolley', kind: 'radio', posX: 0, posY: 0 },
    // 'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-15': { name: 'Oxygen Tank', kind: 'radio', posX: 75, posY: 71 },
    // 'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-42': { name: 'Fridge Temp', kind: 'radio', posX: 51.0, posY: 73.0 },
    'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-19': { name: 'Terry', kind: 'person', posX: 0, posY: 0 },
    'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-3': { name: 'Food Trolley', kind: 'radio', posX: 0, posY: 0 },
    // 'iBeacon:eb6d4696-24be-4663-b152-30d46b0e9cc9-74-3': { name: 'Food Trolley', kind: 'person', posX: 83.0, posY: 33.0, bpm: 70, rr: 15 },
    // 'msft:cdp:0902': { name: 'msft1', kind: 'smartphone' },
    // 'apple:1006:10-12': { name: 'Apple2', kind: 'smartphone' },
    // 'ad:cbbfe0e2-f7f3-4206-84e0-84cbb3d09dfc': { name: 'Tag', kind: 'pricetags' },
  };


  boardWidth = 0;
  boardHeight = 0;
  ratio = 1.0;
  zoom = 40.0;
  dbInfo: any = {
    deviceInfo: {
      sensors: "4/4",
      assets: "4/5",
    },
    roomTemp: 26.23,
    roomHumd: 46.2,
    bodyTemp: 36.7,
    bodyBPressure: "141/90",
    bodyBSugar: "120/160",
    bodyBpm: 72,
    bodyRR: 15,
    fridgeTemp: 3.3,
  };

  constructor(iconsLibrary: NbIconLibraries, private socketService: SocketioService, private toastrService: NbToastrService,) {

    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    // iconsLibrary.registerFontPack('fa', { packClass: 'far', iconClassPrefix: 'far' });
  }
  ngOnInit() {
    this.socketService.setupSocketConnection();

    /////moving Assets
    this.socketService.socket.on('moveAsset', (data: string) => {
      var obj = JSON.parse(data);

      var pObj: any = {};
      pObj[obj.id] = obj;
      this.tags = { ...this.tags, ...this.moveAsset(pObj) }
      this.assets = Object.entries(this.tags);
    });



    /////initValue
    this.socketService.socket.on('initValue', (data: string) => {

      var obj = JSON.parse(data);
      this.devices = obj.devices;
      this.status = obj.status;
      this.tags = obj.assets;

      Object.entries(this.status).forEach((ele, index) => {
        // ele[0] sensor id
        // ele[1] {humidity: "72.00" max_distance: "6.00" status: "online" temperature: "20.90" }
        //
        if (this.positions[ele[0]]) {
          if (ele[1]['status']) {
            this.positions[ele[0]]['status'] = (ele[1]['status'] == 'online');
          }
          if (ele[1]['temperature']) {
            this.positions[ele[0]]['temperature'] = parseFloat(ele[1]['temperature']);
          }
          if (ele[1]['humidity']) {
            this.positions[ele[0]]['humidity'] = parseFloat(ele[1]['humidity']);
          }
          if (parseFloat(ele[1]['temperature'])) {
            this.dbInfo.roomTemp = parseFloat(ele[1]['temperature']);
          }
          if (parseFloat(ele[1]['humidity'])) {
            this.dbInfo.roomHumd = parseFloat(ele[1]['humidity']);
          }
        }

        // this.positions[ele[0]] = this.sensors[index];
      });

      this.tags = this.moveAsset(this.tags);

      this.assets = Object.entries(this.tags);
    });
  }

  index = 1;
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 12000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  moveAsset(asset) {

    for (const [key, value] of Object.entries(asset)) {

      if (Object.entries(value).length > 1 && this.names[key]) {
        var curKey = '';
        var minDist = 100;
        var angle = 0;
        for (const [k, val] of Object.entries(value)) {

          if (k != 'id' && this.positions[k] && minDist > parseFloat(val)) {
            curKey = k;
            minDist = parseFloat(val);
          }
          if (this.positions[k]) {
            angle += parseFloat(val);
          }
        }
        if (asset[key]['temp']) {
          asset[key]['temp'] = asset[key]['temp'].toString().substring(0, 4);
          asset[key]['temp'] = parseFloat(asset[key]['temp']);
          this.dbInfo.fridgeTemp = parseFloat(asset[key]['temp']);
        }


        if (minDist != 100) {
          var sensorX = this.positions[curKey]['posX'];
          var sensorY = this.positions[curKey]['posY'];
          var atans = Math.atan((50 - sensorY) / (50 - sensorX));
          atans += angle / this.zoom * Math.PI * 10;
          asset[key]['posX'] = sensorX + minDist / this.zoom * 100 * Math.cos(atans);
          asset[key]['posY'] = sensorY + minDist / this.zoom * 100 * Math.sin(atans);
          if (this.names[key]) {
            asset[key]['name'] = this.names[key]['name'];
            asset[key]['kind'] = this.names[key]['kind'];
            asset[key]['status'] = true;
            if (this.names[key].posX) {
              asset[key]['posX'] = this.names[key]['posX'];
              asset[key]['posY'] = this.names[key]['posY'];
            }
            if (this.names[key].bpm) {
              asset[key]['bpm'] = this.names[key].bpm + Math.floor(minDist * 2 - 2);
              asset[key]['rr'] = this.names[key].rr;

              if (asset[key]['bpm'] > 72 && this.dbInfo.bodyBpm <= 73) {
                this.showToast('danger', 'Alert for BPM', 'Body BPM was above 72bpm. Please contact Doctor.')
              }

              this.dbInfo.bodyBpm = asset[key]['bpm'];
              this.dbInfo.bodyRR = asset[key]['rr'];

            }
            asset[key] = this.convertPos(asset[key]);
          } else {
            asset[key]['name'] = '';
            asset[key]['kind'] = 'radio';
            asset[key]['status'] = false;
          }
        }
      }
    }
    return asset;
  }



  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  @ViewChild('trackBoard')
  trackBoard: ElementRef;

  onResize(event) {
    this.boardWidth = this.trackBoard.nativeElement.offsetWidth;
    this.boardHeight = this.trackBoard.nativeElement.offsetHeight;

    for (const [key, value] of Object.entries(this.positions)) {
      this.positions[key] = this.convertPos(value);
    }

    this.assets = this.assets.map(asset => {
      asset[1] = this.convertPos(asset[1]);
      return asset;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.boardWidth = this.trackBoard.nativeElement.offsetWidth;
      this.boardHeight = this.trackBoard.nativeElement.offsetHeight;
      this.ratio = this.trackBoard.nativeElement.naturalHeight / this.trackBoard.nativeElement.naturalWidth;

      for (const [key, value] of Object.entries(this.positions)) {
        this.positions[key] = this.convertPos(value);
      }

      this.assets = this.assets.map(asset => {
        asset[1] = this.convertPos(asset[1]);
        return asset;
      });
    }, 1000);
  }

  convertPos(pos: any) {

    if (pos['posX'] < 5) {
      pos['posX'] = 10 - pos['posX'];
    }
    if (pos['posY'] < 5) {
      pos['posY'] = 10 - pos['posY'];
    }
    if (pos['posX'] > 100) {
      pos['posX'] = 200 - pos['posX'];
    }
    if (pos['posY'] > 100) {
      pos['posY'] = 200 - pos['posY'];
    }
    pos['posLeft'] = this.boardHeight / this.ratio * pos['posX'] / 100.0 - 12 + (this.boardWidth - this.boardHeight / this.ratio) / 2;
    pos['posTop'] = this.boardHeight * pos['posY'] / 100.0 - 12;
    return pos;
  }

}
