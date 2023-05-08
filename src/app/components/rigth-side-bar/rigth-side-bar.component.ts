import { Component, Input } from '@angular/core';
import { Nw3Component } from 'src/app/nw3/nw3.component';

@Component({
  selector: 'app-rigth-side-bar',
  templateUrl: './rigth-side-bar.component.html',
  styleUrls: ['./rigth-side-bar.component.scss']
})
export class RigthSideBarComponent extends Nw3Component {
  mainMenu = false;
  isFullscreen = false;
  elem: any;
 
 
  toogleFont = true;

  toogleMenu() {
    this.mainMenu = !this.mainMenu;
  }

  openFullscreen() {
    this.elem = document.documentElement;
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    }
    else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      }
      else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }


  displayNameVoteInfo() {
    this.displayNameVoteMobiile = !this.displayNameVoteMobiile;
  }

  
  voteUserBadges() {
    this.displayVoteUserBadges = !this.displayVoteUserBadges;
    if (this.displayVoteUserBadges) {
      this.positiveUsersVote = this.nwPositiveVote;
      this.NeutralUsersVote = this.nwNeutralVote;
      this.NegativeUsersVote = this.nwNegativeVote;
      this.allVoters = this.nwPositiveVote + this.nwNeutralVote + this.nwNegativeVote;

    } else {
      this.positiveUsersVote = '';
      this.NeutralUsersVote = '';
      this.NegativeUsersVote = '';
      this.allVoters = '';
    }
  }

  displayTally() {
    this.displayTallyButtons = !this.displayTallyButtons;
  }
  fontTheme() {
    this.toogleFont = !this.toogleFont;
    this.font2 = this.fonts[this.fontIndexCounter];
    if (this.fontIndexCounter === 7) {
      this.fontIndexCounter = 0;
    } else {

      this.fontIndexCounter++;
    }
  }

}
