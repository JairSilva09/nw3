import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-setting-box',
  templateUrl: './setting-box.component.html',
  styleUrls: ['./setting-box.component.scss']
})
export class SettingBoxComponent {
  groupTestNameFontSize: any;
  groupSlideHeihtValue: any
  groupSlidelineHeightValue:any
  @Input() projectName: any;
  
  setFontSize(groupTestNameFontSize: any) {
    this.groupTestNameFontSize = groupTestNameFontSize;
    localStorage.setItem(this.projectName + '_groupTestNameFontSize', this.groupTestNameFontSize.toString());
  }

  setGroupSlideHeight(groupSlideHeiht: any) {
    this.groupSlideHeihtValue = groupSlideHeiht;
    localStorage.setItem(this.projectName + '_groupSlideHeihtValue', this.groupSlideHeihtValue.toString());
  }

  setGroupSlidelineHeight(groupSlidelineHeight:any) {
    this.groupSlidelineHeightValue = groupSlidelineHeight;
    localStorage.setItem(this.projectName + '_groupSlidelineHeightValue', this.groupSlidelineHeightValue.toString());
  } 
}
