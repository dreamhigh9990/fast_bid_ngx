import { Component, OnInit } from '@angular/core';
import { NbIconLibraries,NbDialogService } from '@nebular/theme';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';

@Component({
  selector: 'ngx-floorplans',
  templateUrl: './floorplans.component.html',
  styleUrls: ['./floorplans.component.scss']
})
export class FloorplansComponent implements OnInit {

  readonly position = [{ lat: 51.678418, lng: 7.809007 },{ lat: 51.658458, lng: 7.899047 },{ lat: 51.618428, lng: 7.909017 }];
  chkView = true;

  floorplans =[
    {
      fpId:1001,
      fpTitle:"71 Main Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v6.jpg",
      fpAddress:"71 Main Street, Murbko, South Australia",
      Customer:"Archie Clarke",
      Doctor:"Fry,Norman",
      Nurse:"Showgirl Lola",
      Sensors:"3",
      Assets:"5",
      latlng:{
        lat: -34.271694, lng: 140.601661
      }
    },
    {
      fpId:1002,
      fpTitle:"94 Beach Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v7.jpg",
      fpAddress:"94 Beach Street, Dilston, Tasmania",
      Customer:"Thomas Gill",
      Doctor:"Fry,Norman",
      Nurse:"Showgirl Lola",
      Sensors:"3",
      Assets:"4",
      latlng:{
        lat: -41.330141, lng: 147.0698546
      }
    },
    {
      fpId:1003,
      fpTitle:"31 Alfred Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v8.jpg",
      fpAddress:"31 Alfred Street, Bandya, Western Australia",
      Customer:"Harley Eaton",
      Doctor:"Fry,Norman",
      Nurse:"Showgirl Lola",
      Sensors:"3",
      Assets:"5",
      latlng:{
        lat: -27.6989, lng: 122.13295
      }
    },
    {
      fpId:1004,
      fpTitle:"171 Perth Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v9.jpg",
      fpAddress:"171 Perth Street, Melbourne, VIC, Australia",
      Customer:"FAIRHAVEN",
      Doctor:"Fry,Norman",
      Nurse:"Showgirl Lola",
      Sensors:"2",
      Assets:"8",
      latlng:{
        lat: -37.840935, lng: 144.946457
      }
    },
    {
      fpId:1005,
      fpTitle:"71 Main Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v4.jpg",
      fpAddress:"71 Main Street, Murbko, South Australia",
      Customer:"Archie Clarke",
      Nurse:"Showgirl Lola",
      Sensors:"1",
      Assets:"6",
      latlng:{
        lat: -34.271694, lng: 140.601661
      }
    },
    {
      fpId:1006,
      fpTitle:"94 Beach Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v10.jpg",
      fpAddress:"94 Beach Street, Dilston, Tasmania",
      Customer:"Thomas Gill",
      Nurse:"Showgirl Lola",
      Sensors:"1",
      Assets:"5",
      latlng:{
        lat: -41.330141, lng: 147.0698546
      }
    },
    {
      fpId:1007,
      fpTitle:"31 Alfred Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v11.jpg",
      fpAddress:"31 Alfred Street, Bandya, Western Australia",
      Customer:"Harley Eaton",
      Nurse:"Showgirl Lola",
      Sensors:"2",
      Assets:"8",
      latlng:{
        lat: -27.6989, lng: 122.13295
      }
    },
    {
      fpId:1008,
      fpTitle:"171 Perth Street",
      imgUrl:"/assets/images/dream-edge/3d_floor_plan_v3.jpg",
      fpAddress:"171 Perth Street, Melbourne, VIC, Australia",
      Customer:"FAIRHAVEN",
      Nurse:"Showgirl Lola",
      Sensors:"2",
      Assets:"8",
      latlng:{
        lat: -37.840935, lng: 144.946457
      }
    },
  ];

  constructor(iconsLibrary: NbIconLibraries,private dialogService: NbDialogService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    // iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  open(param) {
    this.dialogService.open(DetailDialogComponent, {
      context: {
        param: param,
      },
    });
  }

  addNewFloorPlan(){

  }

  ngOnInit(): void {
  }

}
