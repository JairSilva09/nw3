import { Component, Input } from '@angular/core';
import { Nw3Component } from 'src/app/nw3/nw3.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent extends Nw3Component {
  displayPositiveBox = false;
  displayNeutralbox = false;
  displayNegativeBox = false;
  displayAllUsersBox = false;
  @Input() backgroundImg: any;
  @Input() slideFormat : any
  displayOverviewBox(boxType:any ) {

    if (this.displayVoteUserBadges) {

      if (boxType === 'positiveBox') {

        this.displayPositiveBox = true;


      } else if (boxType === 'neutralBox') {

        this.displayNeutralbox = true;

      } else if (boxType === 'negativeBox') {

        this.displayNegativeBox = true;

      } else if (boxType === 'allUsersBox') {

        this.displayAllUsersBox = true;

      }

    }

  }
  recraft() {
    // alert("Hello! I am an alert box!!");
    this.recraftChecked = !this.recraftChecked;
  }

}
