import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Nw3Service } from '../services/nw3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nw3',
  templateUrl: './nw3.component.html',
  styleUrls: ['./nw3.component.scss']
})
export class Nw3Component implements OnInit {
  HEROES: any[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    // { id: 19, name: 'Magma' },
    // { id: 20, name: 'Tornado' }
  ];
  chartOption: any;
  fonts = ['sans-serif', 'coture', 'caviar', 'Chelsea', 'Gacor', 'NyataFTR', 'Pinkerston', 'Quicksand_Book', 'Quicksand_Light'
    , 'Cruncho', 'LilacBlockDemo', 'Medhurst', 'NewYork'];
  secodaryFontIndex = 0;
  font1 = this.fonts[1];
  font2 = this.fonts[0];
  font3 = this.fonts[1];
  font4 = this.fonts[1];
  clickedSummaryName(clickedName: any, originalName: any) {

    let searchName = clickedName;
    if (originalName) {
      searchName = originalName;
    } else {
      searchName = searchName.split('|')[0]
    }

    this._NW3Service.getSelectedName(this.projectId, searchName).subscribe((data: any) => {
      this.go = (data[0].presentationStatus === '0') ? true : false;
      this.isGoVoteOn = this.go;
      this.slideType = '';
      this.currentPage = parseInt(data[0].SlideNumber);
      this.pageNumber = parseInt(data[0].SlideNumber);
      this.currentProgress = (this.pageNumber / this.passTotalPages) * 100;

      this.positiveChecked = false;
      this.neutralChecked = false;
      this.negativeChecked = false;

      // slideBackground = 'url(http://bipresents.com/nw2/' + this.slideNextPart;  slideNextPart = 'Test_WELL_PLATFORM/thumbnails/014.jpg)';
      if (data[0].NameRanking.toLowerCase() === 'positive') {
        this.positiveChecked = true;
        this.neutralChecked = false;
        this.negativeChecked = false;
      } else if (data[0].NameRanking.toLowerCase() === 'neutral') {
        this.neutralChecked = true;
        this.positiveChecked = false;
        this.negativeChecked = false;
      } else if (data[0].NameRanking.toLowerCase() === 'negative') {
        this.negativeChecked = true;
        this.positiveChecked = false;
        this.neutralChecked = false;
      }
      this.newNames = data[0].NewNames;
      this.newComments = data[0].NamesToExplore;
      this.slideNextPart = data[0].SlideBGFileName;
      this.slideBackground = 'url(http://bipresents.com/nw2/';
      this.slideBackground = this.slideBackground + this.slideNextPart + ')';
      this.rankIcon = [];

      if (!data[0].GroupedNames) {
        data[0].GroupedNames = data[0].Name;
        if (data[0].Name.includes('##')) {
          this.slideType = '';
        } else {
          this.slideType = data[0].SlideType;
        }

        if (data[0].GroupedNames && data[0].GroupedNames.length > 0 && this.slideType === '') {
          this.slideType = 'MultipleNameEvaluation';
          this.category = data[0].NameCategory;
          if (data[0].GroupedNames !== '') {
            if (data[0].GroupedNames.includes('##')) {
              this.groupName = data[0].GroupedNames.split('##');

              this.negativeChecked = false;
              this.positiveChecked = false;
              this.neutralChecked = false;

              // this.groupName = "APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##LASTONE |(CT) (JB)|ベンポロ".split('##');
              // this.groupName = "APPOLOVENAPPOLOVENAPPOLOVENAPPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##LASTONE |(CT) (JB)|ベンポロ".split('##');
              this.rankIconsValue = data[0].NameRanking.split('##');
              if (this.rankIconsValue[0] !== "") {
                //  this.groupName.forEach(rankValue => {
                this.rankIconsValue.forEach((rankValue: any) => {
                  if (rankValue.toLowerCase() === 'novalue') {
                    this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                  } else if (rankValue.toLowerCase() === 'positive') {
                    this.rankIcon.push({ icon: this.positiveIcon, color: this.positiveColor });
                  } else if (rankValue.toLowerCase() === 'neutral') {
                    this.rankIcon.push({ icon: this.neutralIcon, color: this.neutralColor });
                  } else if (rankValue.toLowerCase() === 'negative') {
                    this.rankIcon.push({ icon: this.negativeIcon, color: this.negativeColor });
                  } else {
                    this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                  }
                });
              } else {
                this.groupName.forEach((rankValue: any) => {
                  this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                });
              }

              this.rankIconsStyle = [''];
              this.groupName.forEach((element: any) => {
                if (element.split('|').length > 1) {
                  this.isPipeSplit = true;
                }

              });
              this.isGroupNameTooltip = true;
              // this.summaryViewFlexLayout = 'column wrap';
            } else {
              this.groupName = data[0].GroupedNames.split('$$');
              this.isGroupNameTooltip = false;
            }
          } else {
            this.name = data[0].Name;
            this.name = this.name.replace('(', '|(');
            if (this.evaluationTimeElement && data[0].TemplateFileName !== 'images/BackGrounds/Default.jpg') {
              // tslint:disable-next-line:max-line-length
              this.evaluationTimeElement.nativeElement.style.backgroundImage = this.BackgroundUrl + this.imgBackground[this.backgroundCounter] + '.jpg)';
              this.evaluationTimeElement.nativeElement.style.backgroundSize = 'cover';
            }
          }

        } else {
          // this.slideNameBackground = 'url("https://image.shutterstock.com/shutterstock/photos/1897867054/display_1500/stock-vector-currency-watermark-background-intense-illustration-detailed-design-1897867054.jpg")';
          this.slideType = 'NameEvaluation';
          if (data[0].NameRanking === "") {
            this.vote = false;
          }
          else {
            this.vote = true;
          }
          this.voteUsersInterval = setInterval(() => {
            this.getNwVoteData();
          }, 500);
        }
      }
      if (this.slideType === 'NameEvaluation') {
        this.category = data[0].NameCategory;
        this.rationale = data[0].NameRationale;
        this.testName = data[0].Name;
      }
    });
  } fontIndexCounter = 0;
  isTableOfContent = false;
  isSettings = true;
  isGoVoteOn = false;
  hasSpeechBrowserSupport: any;
  isTableContent = true;


  slideNextPart = 'nw_slides/TEAM/thumbnails/001.jpg)';
  slideBackground = 'url(http://bipresents.com/nw2/';

  VotersList: any;
  votersBadge: any;
  nwPositiveVote: any;
  nwNegativeVote: any;
  nwNeutralVote: any;
  nwPositiveVoteUsers: any;
  nwNegativeVoteUsers: any;
  nwNeutralVoteUsers: any;
  positiveUsersVote: any = '';
  NeutralUsersVote: any = '';
  NegativeUsersVote: any = '';
  projectData: any;
  // name: any ;
  projectName: any;
  // bsrProjectId: any;
  negativePronunciation = [];
  recraftChecked: any;

  slideModel: any = {
    'presentationid': '3157',
    'slideNumber': '1',
    'NameRanking': '',
    'NewNames': '',
    'NamesToExplore': '',
    'NamesToAvoid': '',
    'Direction': 'Next',
    'KanaNamesNegative': '',
    'recraft': '0',
  };

  go: any;
  GGClass = 'GG';
  newNameColor = 'warn';
  commentsColor = 'accent';
  // 3375,23,'Positive','','','','Next','',0


  // MENU VARS
  totalPages: any;
  keyboardDirection: any;
  switchButton: any;
  //  cantMoveForward: string;
  //  numberChanged: string;
  navigatePageInput: any;
  showTicker = new EventEmitter<string>();
  changePage = new EventEmitter<string>();
  //  currentSlideType = new EventEmitter<string>();
  reset = new EventEmitter<boolean>();
  showBackground = new EventEmitter<boolean>();
  hideBackgroundEmitter = new EventEmitter<boolean>();
  hideShowOverview = new EventEmitter<string>();
  tickeObj = {
    showingTicker: false,
    active: true
  };

  initialPage = 1;
  currentPage = this.initialPage;
  hideMenu = true;
  hideBackground = false;
  mute: any;
  nwVote = false;
  slideData: any;
  hideButton = true;
  isNonProp = true;
  showHelp = false;
  vote = true;

  stopMovingForward = false;
  overViewState = true;

  networkStatus: any;

  movingSlide = true;
  japanese: any;
  isKatakana_BigJap: any;
  nameCandidates: any;
  groupName: any;
  showRankedNames: any;
  audiofile: any;
  fileToPlay: any;
  changePageNumber: any;
  groupNameType: any;
  // displayBackground: boolean;
  tempBackground: any;
  evaluationTimeElement: any;
  slideType: any;
  extraCommentsElement: any;
  totalPositive: any;
  totalNeutral: any;
  katakanaNames: any;
  BackgroundUrl: any;
  backgroundCounter: any;
  summarySlideMinWidth: any;
  rationaleMinWidth: any;
  separateCandidateElement: any;
  switchPosNegElement: any;
  groupRationale: any;
  rationale: any;
  category: any;
  positiveChecked = false;
  neutralChecked = false;
  negativeChecked = false;
  isPipeSplit: any;
  isGroupNameTooltip: any;
  summaryViewFlexLayout: any;
  cantMove: any;
  txtNewNameElement: any;
  pronunciationElement: any;
  newNameFormField: any;
  commentsFormField: any;
  nameCandidateElement: any;
  pronunciationParentElement: any;
  hoverPositive: any;
  hoverNeutral: any;
  hoverNegative: any;
  VotersListOn: any;
  postRadio: any;
  isNewName: any;
  NeuRadio: any;
  NegRadio: any;
  // pageNumber: any;
  faVolumeUp: any;
  boxes: any;
  moving: any;
  wasClicked: any;
  listened: any;
  selectBackground: any;
  tempObj: any;
  tickerInterval: any;
  voteUsersInterval: any;
  slideChange: any;
  resetTime = false;
  auto = false;
  timer: any;
  interval: any;
  pieChart: any;
  posCount: any;
  neuCount: any;
  negCount: any;
  hasBackground: any;
  totalNewNames: any;
  tickerElement: any;
  // tickerTime: string;
  // @Input() currentSlidePageInfo = '';
  // @Input() projectId: string;
  imgBackground: any;
  slideImageElement: any;
  savePage: any;



  // DASH VARS 
  projectId: string = '';
  bsrProjectId: string = '';
  passTotalPages: any;
  name = '';
  tickerTime = '';
  presentationTime = false;
  results: any;
  changingPage = '';
  pageNumber = 1;
  currentProgress = this.pageNumber;
  cantMoveForward: any;
  isImage = true;
  isEvaluation = false;
  numberChanged = '';
  timeToReset = false;
  displayBackground = true;
  pageDirection = 0;
  contentResize = 90;
  overviewDisplay = true;
  thumbNails: any;
  navigatePageIndex: any;

  testName = 'Comirnaty';

  newNames = '';
  newComments = '';


  // GROUP NAMES TEMPLATE
  selectNameItemIndex: any;
  myleft: any;
  mytop: any;
  selectVoteIndex: any;
  groupTestNameFontSize: any;
  groupSlideHeihtValue: any;
  groupSlidelineHeightValue: any;
  cardWidthValue: any;
  rankIcon: any = [];
  rankIconsValue: any;
  rankIconsStyle: any;
  isFavoriteOn = false; slideNameBackground: any;


  // TALLY AND VOTE USER VARS
  displayVoteUserBadges = false;
  displayTallyButtons = false
  totalNegative: any;
  AditionalComments: any;
  allVoters: any = '';
  displayNameVoteMobiile = false;
  isQRcode = true;
  myAngularxQrCode: any;

  // SUMMARY CHART VARS
  summaryPositive = false;
  summaryNeutral = false;
  summaryNegative = false;
  summaryNewNames = true;
  summaryChart = false;

  chartDimension: [number, number] = [700, 450];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Votes';
  showYAxisLabel = true;
  yAxisLabel = 'Names ';
  colorScheme = [
    {
      'name': 'Positive',
      'value': '#01bfa5'
    },
    {
      'name': 'Neutral',
      'value': '#ffdf00'
    },
    {
      'name': 'Negative',
      'value': '#fe0265'
    },
    {
      'name': 'New Names',
      'value': '#0237ff'
    }
  ];
  currentSlidePageInfo: any;
  previousSlideType: any;
  soundVolume = 0.1;
  totalNewNames2: any;
  infoColor = '#d8d8d8';
  negativeColor = '#0278ee';
  neutralColor = '#ee7802';
  positiveColor = '#09bf06';
  totalPositiveNames: any;
  totalNeutralNames: any;
  totalNegativeNames: any;
  positiveIcon = 'task_alt';
  neutralIcon = 'thumb_up';
  negativeIcon = 'thumb_down';
  infoIcon = 'info';
  TestnameImagePath: any;


  constructor(@Inject(DOCUMENT) public document: any,
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
    const projectData = JSON.parse(this.projectData);
    this.projectName = JSON.parse(this.projectData)[0].DisplayName;
    this.testName = projectData[this.pageNumber - 1].SlideDescription;


    //  FONTS INITIAL PARAMETERS FOR SLIDERS
    this.groupTestNameFontSize = (localStorage.getItem(this.projectName + '_groupTestNameFontSize')) ? localStorage.getItem(this.projectName + '_groupTestNameFontSize') : '50';
    this.groupSlideHeihtValue = (localStorage.getItem(this.projectName + '_groupSlideHeihtValue')) ? localStorage.getItem(this.projectName + '_groupSlideHeihtValue') : '5000';
    this.groupSlidelineHeightValue = (localStorage.getItem(this.projectName + '_groupSlidelineHeightValue')) ? localStorage.getItem(this.projectName + '_groupSlidelineHeightValue') : '10';

    //////////////////////////////////////////

    if (this.resetTime !== false) {
      this.positiveChecked = false;
      this.neutralChecked = false;
      this.negativeChecked = false;
      this.recraftChecked = false;
    } else {
      if (this.tickerTime !== '') {
        if (JSON.parse(this.tickerTime).active !== true) {
          const pageObj = JSON.parse(this.currentSlidePageInfo);
          if (pageObj.moveTo === 'summary') {
            this.savePage = this.pageNumber;
          }
        }
      } else {
        const pageObj = JSON.parse(this.currentSlidePageInfo);
        this.pageNumber = (this.currentSlidePageInfo !== '{}') ? pageObj.currentPage : this.pageNumber;
        this.slideType = projectData[this.pageNumber - 1].SlideType.trim();

        if (this.slideType !== 'Image') {

          this.testName = projectData[this.pageNumber - 1].SlideDescription;

          const lastVisitedPageNumber = (pageObj.moveTo === 'previous') ? this.pageNumber + 1 : this.pageNumber - 1;
          this.setEvaluationData(lastVisitedPageNumber, pageObj.moveTo);
        } else {
          setTimeout(() => {
            const bgImage = 'url(http://bipresents.com/nw2/' + projectData[this.pageNumber - 1].SlideBGFileName + ')';
            this.slideBackground = bgImage;
            // this.slideImageElement.nativeElement.style.backgroundImage = bgImage;
            // this.slideImageElement.nativeElement.style.backgroundSize = '100% 100%';
            const lastVisitedPageNumber = (pageObj.moveTo === 'previous') ? this.pageNumber + 1 : this.pageNumber - 1;
            this.setEvaluationData(lastVisitedPageNumber, pageObj.moveTo);
          }, 100);
        }
      }
    }

  }

  playSound(soundEffect: any, volume: any) {
    let audio = new Audio();
    // audio.src = soundEffect;
    // audio.volume = volume;
    audio.src = "assets/sound/wav/" + soundEffect;
    audio.volume = volume;
    audio.load();
    audio.play();
  }

  selectPage(movingTo: any) {
    // stop moving slides for 300 miliseconds
    this.slideModel.Direction = movingTo;
    if (this.movingSlide) {
      this.movingSlide = false;
      let movePage = '';
      if (this.hideBackground) {
        this.hideBackground = !this.hideBackground;
      }
      if (movingTo === 'next') {
        if (this.currentPage >= this.totalPages) {
          this.currentPage = this.totalPages;
        } else {
          this.currentPage += 1;
          movePage = '{"currentPage":' + this.currentPage + ', "moveTo":"' + movingTo + '"}';
          this.pageNumberChange(JSON.parse(movePage).currentPage);
        }
      } else if (movingTo === 'home') {
        this.currentPage = 1;

        movePage = '{"currentPage":' + this.currentPage + ', "moveTo":"' + movingTo + '"}';
        this.pageNumberChange(JSON.parse(movePage).currentPage);

      } else if (movingTo === 'summary') {
        this.currentPage = this.totalPages;

        movePage = '{"currentPage":' + this.currentPage + ', "moveTo":"' + movingTo + '"}';
        this.pageNumberChange(JSON.parse(movePage).currentPage);

      } else if (movingTo === 'previous') {
        if (this.currentPage <= this.initialPage) {
          this.currentPage = this.initialPage;

          movePage = '{"currentPage":' + this.currentPage + ', "moveTo":"' + movingTo + '"}';
          this.pageNumberChange(JSON.parse(movePage).currentPage);

        } else {
          this.currentPage -= 1;

          movePage = '{"currentPage":' + this.currentPage + ', "moveTo":"' + movingTo + '"}';
          this.pageNumberChange(JSON.parse(movePage).currentPage);

        }
      } else {
        movePage = '{"currentPage":' + this.currentPage + ', "moveTo":""}';
        this.pageNumberChange(JSON.parse(movePage).currentPage);

      }
      setTimeout(() => {
        this.movingSlide = true;
      }, 300);
    }
  }
  pageNumberChange(selectedPage: any) {
    this.pageNumber = Number(selectedPage);
    // this.pageNumber = 8;
    // PROGRESS BAR DATA
    this.currentPage = selectedPage;
    this.currentProgress = (this.pageNumber / this.passTotalPages) * 100;
    if (selectedPage === this.passTotalPages) {
      this.changeSummaryList('chart');
    }

    clearInterval(this.voteUsersInterval);
    const pageObj = JSON.parse(this.currentSlidePageInfo);
    const projectData = JSON.parse(this.projectData);
    this.projectName = JSON.parse(this.projectData)[0].DisplayName;
    this.testName = projectData[this.pageNumber - 1].SlideDescription;
    this.pageNumber = (this.currentSlidePageInfo !== '{}') ? pageObj.currentPage : this.pageNumber;
    let lastVisitedPageNumber: any;
    this.previousSlideType = this.slideType;
    this.slideType = '';

    if (projectData[this.pageNumber - 1].SlideType.trim() === 'NameSummary') {
      this.slideType = 'NameSummary';
      // this.getSelectedRank('chart')
    }
    else if (projectData[this.pageNumber - 1].SlideType.trim() === 'Image') {
      this.slideType = 'Image';
      setTimeout(() => {
        const bgImage = 'url(http://bipresents.com/nw2/' + projectData[this.pageNumber - 1].SlideBGFileName + ')';
        this.slideBackground = bgImage;
        lastVisitedPageNumber = (pageObj.moveTo === 'previous') ? this.pageNumber + 1 : this.pageNumber - 1;
        this.setEvaluationData(lastVisitedPageNumber, pageObj.moveTo);
      }, 100);
    }

    if (this.slideModel.Direction === 'next') {
      this.slideModel.slideNumber = this.pageNumber - 1;
    } else if (this.slideModel.Direction === 'previous') {
      this.slideModel.slideNumber = this.pageNumber;
    }

    this.slideModel.presentationid = this.projectId;
    this.slideModel.NewNames = this.newNames;
    this.slideModel.NamesToExplore = this.newComments;

    // RESET NEW NAMES AND COMMENTS BOXES
    this.newNames = '';
    this.newComments = '';

    if (this.previousSlideType === 'MultipleNameEvaluation') {
      this.slideModel.NameRanking = '';
      this.rankIcon.forEach((rankIcon: any) => {
        if (rankIcon.icon === this.positiveIcon) {
          this.slideModel.NameRanking += 'positive' + '##';
        } else if (rankIcon.icon === this.neutralIcon) {
          this.slideModel.NameRanking += 'neutral' + '##';
        } else if (rankIcon.icon === this.negativeIcon) {
          this.slideModel.NameRanking += 'negative' + '##';
        } else if (rankIcon.icon === this.infoIcon) {
          this.slideModel.NameRanking += 'novalue' + '##';
        }
      });
    }

    if (this.positiveChecked) {
      this.slideModel.NameRanking = 'Positive'
    } else if (
      this.neutralChecked) {
      this.slideModel.NameRanking = 'Neutral'
    } else if (
      this.negativeChecked) {
      this.slideModel.NameRanking = 'Negative'
    }
    this.saveData(JSON.stringify(this.slideModel));
  }

  changeSummaryList(listSelection: any) {
    if (listSelection === 'Positive') {
      this.summaryPositive = true;
      this.summaryNeutral = false;
      this.summaryNegative = false;
      this.summaryNewNames = false;
      this.summaryChart = false;
    }
    else if (listSelection === 'Neutral') {
      this.summaryPositive = false;
      this.summaryNeutral = true;
      this.summaryNegative = false;
      this.summaryNewNames = false;
      this.summaryChart = false;
    }
    else if (listSelection === 'Negative') {
      this.summaryPositive = false;
      this.summaryNeutral = false;
      this.summaryNegative = true;
      this.summaryNewNames = false;
      this.summaryChart = false;
    }
    else if (listSelection === 'New Names') {
      this.summaryPositive = false;
      this.summaryNeutral = false;
      this.summaryNegative = false;
      this.summaryNewNames = true;
      this.summaryChart = false;
    }
    else if (listSelection === 'chart') {
      this.summaryPositive = false;
      this.summaryNeutral = false;
      this.summaryNegative = false;
      this.summaryNewNames = false;
      this.summaryChart = true;
    }
    this.pieChart = [];
    let newChartData = [];
    this.totalNewNames = [];
    this._NW3Service.getRetainTypeName(this.projectId, "New").subscribe((data: any) => {
      this.totalNewNames = data;
      this._NW3Service.getRetainTypeName(this.projectId, 'Positive').subscribe((resultPos: any) => {
        this.totalPositive = resultPos.length;
        this.totalPositiveNames = resultPos;
        this._NW3Service.getRetainTypeName(this.projectId, 'Neutral').subscribe((resultNeu: any) => {
          this.totalNeutral = resultNeu.length;
          this.totalNeutralNames = resultNeu;
          this._NW3Service.getRetainTypeName(this.projectId, 'Negative').subscribe((resultNeg: any) => {
            this.totalNegative = resultNeg.length
            this.totalNegativeNames = resultNeg;
            this._NW3Service.getGroupSummary(this.projectId).subscribe((groupResult: any) => {
              let arrGroupRank: any;
              let arrGroupName: any;
              groupResult.forEach((obj: any) => {
                if (obj.name.includes('##')) {
                  arrGroupRank = obj.nameranking.split('##');
                  arrGroupName = obj.name.split('##');
                } else {
                  arrGroupRank = obj.nameranking.split('##');
                  arrGroupName = obj.name.split('$$');
                }
                arrGroupName.forEach((name: any, index: any) => {
                  if (arrGroupRank[index] && arrGroupRank[index].toLowerCase() === 'positive') {
                    this.totalPositive++;
                    this.totalPositiveNames.push(
                      {
                        Name: name,
                        NameToDisplay: obj.name
                      }
                    );
                  }
                  if (arrGroupRank[index] && arrGroupRank[index].toLowerCase() === 'negative') {
                    this.totalNegative++;
                    this.totalNegativeNames.push(
                      {
                        Name: name,
                        NameToDisplay: obj.name
                      }
                    );
                  }
                  if (arrGroupRank[index] && arrGroupRank[index].toLowerCase() === 'neutral') {
                    this.totalNeutral++;
                    this.totalNeutralNames.push(
                      {
                        Name: name,
                        NameToDisplay: obj.name
                      }
                    );
                  }
                });

                newChartData = []
                newChartData.push({
                  'name': 'Positive',
                  'value': this.totalPositive
                });

                newChartData.push({
                  'name': 'Neutral',
                  'value': this.totalNeutral
                });

                newChartData.push({
                  'name': 'Negative',
                  'value': this.totalNegative
                });

                newChartData.push({
                  'name': 'New Names',
                  'value': this.totalNewNames.length
                });

                const resArr: any = [];
                newChartData.forEach(function (item) {
                  const i = resArr.findIndex((x: any) => x.name === item.name);
                  if (i <= -1) {
                    resArr.push({ name: item.name, value: item.value });
                  }
                }, this.pieChart = resArr);

              });
            });
          });
        });
      });
    });
  }
  setEvaluationData(previousNumber: any, direction: any) {
    let selectedRank;

    if (this.groupName === '') {
      if (this.positiveChecked) {
        selectedRank = 'Positive';
      } else if (this.neutralChecked) {
        selectedRank = 'Neutral';
      } else if (this.negativeChecked) {
        selectedRank = 'Negative';
      } else {
        selectedRank = '';
      }

      this.slideModel.NameRanking = selectedRank;
    }
    this.slideModel.presentationid = this.projectId;
    this.slideModel.slideNumber = previousNumber;
    let strPronunciation = '';
    if (this.negativePronunciation.join(',').indexOf('\'') >= 0) {
      strPronunciation = this.negativePronunciation.join(',').replace(/'/g, '\'\'');
    } else {
      strPronunciation = this.negativePronunciation.join(',');
    }

    if (strPronunciation !== '') {
      this.slideModel.KanaNamesNegative = strPronunciation;
    } else {
      if (this.slideModel.KanaNamesNegative !== '') {
        if (this.slideModel.KanaNamesNegative.join(',').indexOf('\'') >= 0) {
          strPronunciation = this.slideModel.KanaNamesNegative.join(',').replace(/'/g, '\'\'');
        } else {
          strPronunciation = this.slideModel.KanaNamesNegative.join(',');
        }
        this.slideModel.KanaNamesNegative = strPronunciation;
      }
    }

    if (direction === 'next') {
      this.slideModel.Direction = 'Next';
      this.saveData(JSON.stringify(this.slideModel));
    }
    if (direction === 'previous') {
      this.slideModel.slideNumber + 1;
      this.slideModel.Direction = 'Prev';
      this.saveData(JSON.stringify(this.slideModel));
    }
    if (direction === 'home') {
      this.slideModel.Direction = 'Next';
      this.slideModel.slideNumber = 1;
      this.saveData(JSON.stringify(this.slideModel));
    }
    if (direction === 'summary') {
      this.slideModel.Direction = 'Next';
      this.saveData(JSON.stringify(this.slideModel));
      setTimeout(() => {
        this.slideModel.slideNumber = JSON.parse(this.projectData).length;
        this.saveData(JSON.stringify(this.slideModel));
        this.isNewName = false;
        this.postRadio = false;
        this.NeuRadio = false;
        this.NegRadio = false;
      }, 50);
    }
    if (direction === '') {
      this.slideModel.slideNumber = this.pageNumber;
      this.slideModel.Direction = '';
      this.saveData(JSON.stringify(this.slideModel));
    }
  }
  saveData(savingObj: any) {
    if (this.positiveChecked || this.neutralChecked || this.negativeChecked) {
      // this.slideModel.NameRanking = option;
    }
    const temp = JSON.parse(savingObj);
    temp.KanaNamesNegative = this.negativePronunciation.join(',');
    temp.recraft = (this.recraftChecked) ? 1 : 0;
    // savingObj = JSON.stringify(savingObj);
    this._NW3Service.getSaveNSlideInfo(savingObj).subscribe(
      (data: any) => {
        this.isNonProp = (data[0].PresentationType === 'Nonproprietary') ? true : false;
        this.japanese = (data[0].PresentationType === 'Katakana') ? true : false;
        this.isKatakana_BigJap = (data[0].PresentationType === 'Katakana_BigJap') ? true : false;
        this.recraftChecked = (data[0].Recraft === "False") ? false : true;
        this.TestnameImagePath = 'http://bipresents.com/nw2/' + data[0].TestnameImagePath;
        if (this.isKatakana_BigJap) {
          this.japanese = true;
        }

        if (this.japanese) {
          this.katakanaNames = data[0].KanaNames.replace(/`/g, '\'').split('、');
        }
        else {
          this.katakanaNames = data[0].KanaNames.replace(/`/g, '\'').split(',');
        }

        this.go = (data[0].presentationStatus === '0') ? true : false;
        this.isGoVoteOn = this.go;

        // this.slideModel.NameRanking = '';
        this.positiveChecked = false;
        this.neutralChecked = false;
        this.negativeChecked = false;

        // slideBackground = 'url(http://bipresents.com/nw2/' + this.slideNextPart;  slideNextPart = 'Test_WELL_PLATFORM/thumbnails/014.jpg)';
        if (data[0].NameRanking.toLowerCase() === 'positive') {
          this.positiveChecked = true;
          this.neutralChecked = false;
          this.negativeChecked = false;
        } else if (data[0].NameRanking.toLowerCase() === 'neutral') {
          this.neutralChecked = true;
          this.positiveChecked = false;
          this.negativeChecked = false;
        } else if (data[0].NameRanking.toLowerCase() === 'negative') {
          this.negativeChecked = true;
          this.positiveChecked = false;
          this.neutralChecked = false;
        }
        this.newNames = data[0].NewNames;
        this.newComments = data[0].NamesToExplore;
        this.slideNextPart = data[0].SlideBGFileName;
        this.slideBackground = 'url(http://bipresents.com/nw2/';
        this.slideBackground = this.slideBackground + this.slideNextPart + ')';
        this.rankIcon = [];
        if (this.slideType === '') {
          if (data[0].GroupedNames.length > 0) {
            this.slideType = 'MultipleNameEvaluation';
            this.category = data[0].NameCategory;
            if (data[0].GroupedNames !== '') {
              if (data[0].GroupedNames.includes('##')) {
                this.groupName = data[0].GroupedNames.split('##');

                this.negativeChecked = false;
                this.positiveChecked = false;
                this.neutralChecked = false;


                // this.groupName = "APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##LASTONE |(CT) (JB)|ベンポロ".split('##');
                // this.groupName = "APPOLOVENAPPOLOVENAPPOLOVENAPPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##VENPOLLO |(CT) (JB)|ベンポロ##APPOLOVEN|(J)|アポロベン##APPOVEN|(C)|アポベン##LUMVESTIN|(JB) (CTC)|ルムベスティン##ORAVEN|(CB)|オラベン##VENCHAI | (DE) (DEB)|ベンチャイ##VENLEPIUS | (U/I) (BR) (BRB)|ベンレピウス##LASTONE |(CT) (JB)|ベンポロ".split('##');
                this.rankIconsValue = data[0].NameRanking.split('##');
                if (this.rankIconsValue[0] !== "") {
                  //  this.groupName.forEach(rankValue => {
                  this.rankIconsValue.forEach((rankValue: any) => {
                    if (rankValue.toLowerCase() === 'novalue') {
                      this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                    } else if (rankValue.toLowerCase() === 'positive') {
                      this.rankIcon.push({ icon: this.positiveIcon, color: this.positiveColor });
                    } else if (rankValue.toLowerCase() === 'neutral') {
                      this.rankIcon.push({ icon: this.neutralIcon, color: this.neutralColor });
                    } else if (rankValue.toLowerCase() === 'negative') {
                      this.rankIcon.push({ icon: this.negativeIcon, color: this.negativeColor });
                    } else {
                      this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                    }
                  });
                } else {
                  this.groupName.forEach((rankValue: any) => {
                    this.rankIcon.push({ icon: this.infoIcon, color: this.infoColor });
                  });
                }

                this.rankIconsStyle = [''];
                this.groupName.forEach((element: any) => {
                  if (element.split('|').length > 1) {
                    this.isPipeSplit = true;
                  }

                });
                this.isGroupNameTooltip = true;
                // this.summaryViewFlexLayout = 'column wrap';
              } else {
                this.groupName = data[0].GroupedNames.split('$$');
                this.isGroupNameTooltip = false;
              }
            } else {
              this.name = data[0].Name;
              this.name = this.name.replace('(', '|(');
              if (this.evaluationTimeElement && data[0].TemplateFileName !== 'images/BackGrounds/Default.jpg') {
                // tslint:disable-next-line:max-line-length
                this.evaluationTimeElement.nativeElement.style.backgroundImage = this.BackgroundUrl + this.imgBackground[this.backgroundCounter] + '.jpg)';
                this.evaluationTimeElement.nativeElement.style.backgroundSize = 'cover';
              }
            }

          } else {
            // this.slideNameBackground = 'url("https://image.shutterstock.com/shutterstock/photos/1897867054/display_1500/stock-vector-currency-watermark-background-intense-illustration-detailed-design-1897867054.jpg")';
            this.slideType = 'NameEvaluation';
            if (data[0].NameRanking === "") {
              this.vote = false;
            }
            else {
              this.vote = true;
            }
            this.voteUsersInterval = setInterval(() => {
              this.getNwVoteData();
            }, 500);
          }
        }
        // this.setDataToDisplay(data, 'save');
        if (this.slideType === 'NameEvaluation') {
          this.category = data[0].NameCategory;
          this.rationale = data[0].NameRationale;
        }
      }
    );
    // this._NW3Service.saveSlideInformation(savingObj).subscribe(
    //   data => {
    //     // this.setDataToDisplay(data, 'save');
    //   }
    // );


    // this.slideType = this.infoIcon; 

  }
  getNwVoteData() {
    // this.go = !this.go;
    this._NW3Service.getNwVoteData(this.projectName, this.testName).subscribe((res: any) => {
      const data = JSON.parse(res.d);
      this.VotersList = data.VotersList;
      this.votersBadge = data.VotersList.length;
      this.nwPositiveVote = data.Positive;
      this.nwNegativeVote = data.Negative;
      this.nwNeutralVote = data.Neutral;

      this.nwPositiveVoteUsers = data.PositiveVoters
      this.nwNeutralVoteUsers = data.NeutralVoters;
      this.nwNegativeVoteUsers = data.NegativeVoters;
    })
  }
  onChartClick(e: any) {
    console.log(e);
    this.changeSummaryList(e.name)
  }

  selectedOpt(option: any) {
    if (option === 'Positive') {
      this.positiveChecked = !this.positiveChecked;
      this.neutralChecked = false;
      this.negativeChecked = false;
      // this.newNameColor = 'accent';
      // this.commentsColor = 'accent';
    }
    else if (option === 'Neutral') {
      this.neutralChecked = !this.neutralChecked;
      this.positiveChecked = false;
      this.negativeChecked = false;
      // this.newNameColor = 'primary';
      // this.commentsColor = 'primary';

    } else if (option === 'Negative') {
      this.neutralChecked = false;
      this.positiveChecked = false;
      this.negativeChecked = !this.negativeChecked;
    }

    if (this.neutralChecked === true
      || this.positiveChecked === true
      || this.negativeChecked === true) {
      this.vote = true;
    } else {
      this.vote = false;
    }

    if (this.japanese) {
      // this.faVolumeUp = null;
    }
  }
  deleteVoteUser(i: any) {
    console.log(i);
  }
  setAllNamesIcon(icon: any, color: any) {
    if (icon === this.positiveIcon) {
      this.isFavoriteOn = !this.isFavoriteOn;
    }
    let sound;
    if (icon === this.positiveIcon) {
      sound = '01 Hero Sounds/hero_simple-celebration-01.wav'
    } else if (icon === this.negativeIcon) {
      sound = '03 Primary System Sounds/ui_tap-variant-01.wav'
    } else if (icon === this.neutralIcon) {
      sound = '03 Primary System Sounds/ui_lock.wav'
    }
    this.playSound(sound, this.soundVolume);
    this.rankIcon.forEach((currenticon: any) => {
      currenticon.icon = icon;
      currenticon.color = color;
    });

  }
  goVote() {
    this.isGoVoteOn = !this.isGoVoteOn;
    this._NW3Service.sendGoSignalVoting(
      JSON.parse(this.projectData)[0].DisplayName, this.isGoVoteOn).subscribe((res: any) => {
        console.log(res);

      })
  }
  toggleRankIcon(rankIcon: any, i: any) {
    if (rankIcon[i].icon === this.infoIcon) {
      this.rankIcon[i] = { icon: this.positiveIcon, color: this.positiveColor };
    } else if (rankIcon[i].icon === this.positiveIcon) {
      this.rankIcon[i] = { icon: this.neutralIcon, color: this.neutralColor }
    } else if (rankIcon[i].icon === this.neutralIcon) {
      this.rankIcon[i] = { icon: this.negativeIcon, color: this.negativeColor };
    } else if (rankIcon[i].icon === this.negativeIcon) {
      this.rankIcon[i] = { icon: this.infoIcon, color: this.infoColor };
    }
  }
  selectetdNameIndex(i: any, event: any) {
    this.selectNameItemIndex = i;
    this.myleft = event.clientX;
    this.mytop = event.clientY;
  }
  noClickanyWhere() {
    this.hoverPositive = false;
    this.hoverNeutral = false;
    this.hoverNegative = false;
    this.VotersListOn = false;
    this.displayNameVoteMobiile = false;
    this.isQRcode = false;
  }
  
  displayQRCode() {
    this.isQRcode = !this.isQRcode;
    this.myAngularxQrCode = ' www.mynamepage.com/' + 'PROJECTS';
    console.log(this.isQRcode, this.myAngularxQrCode)
  }

}
