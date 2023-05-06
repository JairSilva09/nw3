import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Nw3Service } from '../app/services/nw3.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nw3',
  templateUrl: './nw3.component.html',
  styleUrls: ['./nw3.component.scss']
})
export class Nw3Component implements OnInit {
  changingPage = '';
  slideData = ''
  switchButton: any;
  currentSlidePageInfo: any;
  name = '';
  projectId: string = '';
  bsrProjectId: string = '';
  projectName: any;
  results: any;
  projectData: any;
  thumbNails: any;
  passTotalPages: any;
  totalPages: any;
  isTableContent= true;
  isSettings = true;
  constructor(@Inject(DOCUMENT) private document: any,
    private _NW3Service: Nw3Service, private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.projectName = params['id'];
      localStorage.setItem('projectName', this.projectName);
      this._NW3Service.getProjectId(this.projectName).subscribe((data: any) => {
        this.projectId = data[0].PresentationId;
        localStorage.setItem('data', data[0].PresentationId);
      })
    });
  }

  ngOnInit(): void {
    this.changingPage = '{}';
    this.currentSlidePageInfo = this.changingPage;
    this.activatedRoute.params.subscribe((params: any) => {
      this.name = params.id;
      this._NW3Service.getProjectId(this.name).subscribe(
        (data: any) => {
          // console.log(JSON.parse(data));
          this.projectId = data[0].PresentationId;
          this.bsrProjectId = data[0].BSRPresentationid;
          this._NW3Service.getProjectData(this.projectId).subscribe(
            (data: any) => {
              console.log(data);
              this.results = JSON.stringify(data);
              this.switchButton = this.results;
              this.projectData = this.results;
              this.thumbNails = data;
              this.passTotalPages = data.length;
              this.totalPages = this.passTotalPages;
              this.changes();
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    });


  }
  changes() {

    this.slideData = JSON.parse(this.switchButton);

  }


}
