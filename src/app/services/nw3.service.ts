import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class Nw3Service {
  private isMute = new BehaviorSubject<boolean>(false);
  currentMute = this.isMute.asObservable();
  private isnwVOTE = new BehaviorSubject<boolean>(false);
  currentNWVOTE = this.isnwVOTE.asObservable();
  japanese: string | null= "";

  changemute(mute: boolean) {
    this.isMute.next(mute);
  }
  changeNWvote(mute: boolean) {
    this.isnwVOTE.next(mute);
  }

  constructor(private http: HttpClient) {}

  // webBaseUrl = 'http://localhost:64378/';
  webBaseUrl = 'https://tools.brandinstitute.com/BIWebServices/';
  webBaseUrlVote = 'https://tools.brandinstitute.com/wsGeneral/wsNWVote.asmx/';
  apiCall = 'api/BiFormCreator/';
  _SP_GetCandidateNames = '[BI_GUIDELINES].[dbo].[bsr_getNameCandidates_nw] \'';
  _SP_GetSlideInfo = '[BI_GUIDELINES].[dbo].[nw_SaveSlideData_Group_withRecraft] ';
  // _SP_GetSlideInfo = '[BI_GUIDELINES].[dbo].[nw_SaveSlideData_Group_withMp3] '; OLD SP
  // _SP_GetSlideInfo = '[BI_GUIDELINES].[dbo].[nw_SaveSlideData_Group] ';
  _SP_GetProjectId = '[dbo].[nw_GetPresentationId_BSRID] \'';
  _SP_Get_Group_Summary = '[dbo].[nw_GetSummary_group] ';

  getProjectId(projectName: string) {
    return this.http.post(this.webBaseUrl + this.apiCall, JSON.stringify(this._SP_GetProjectId + projectName + '\''), httpOptions);
    // return this.http.get(this.webBaseUrl + 'api/NW_GetProjectIdWithProjectName?projectName=' + projectName, httpOptions);
  }

  saveNotes(projectId: string, notes: string) {
    return this.http.post(this.webBaseUrl + 'api/NW_SaveNotes',
      JSON.stringify(projectId + ', N\'' + notes + '\', \'Explore\''), httpOptions);
  }

  getNotes(projectId: string) {
    return this.http.get(this.webBaseUrl + 'api/NW_GetNotes?projectid=' + projectId, httpOptions);
  }

  getProjectData(projectId: string) {
    return this.http.get(this.webBaseUrl + 'api/NW_NamesAndSlides?projectId=' + projectId, httpOptions);
  }

  saveSlideInformation(modelToSave: any) {
    return this.http.post(this.webBaseUrl + 'api/NW_SaveAndReturnSlideData', modelToSave, httpOptions);
  }

  getRetainTypeName(projectId: string, selectedRank: string) {
    if (selectedRank === 'Negative' || selectedRank === 'New') {
      return this.http.get(this.webBaseUrl + 'api/NW_GetSummary?instruccion=' + projectId + ', "' +
        selectedRank + ' Names"', httpOptions);
    }
    return this.http.get(this.webBaseUrl + 'api/NW_GetSummary?instruccion=' + projectId + ', "' +
      selectedRank + ' Retained Names"', httpOptions);
  }

  getSelectedName(projectId: string, selectedName: string | number | boolean) {
    return this.http.get(this.webBaseUrl + 'api/NW_NamesAndSlides?projectIdAndTestName=' + projectId + ',\'' +
      encodeURIComponent(selectedName) + '\'', httpOptions);
  }

  getNewNames(projectId: string) {
    return this.http.post(this.webBaseUrl + this.apiCall, JSON.stringify(this._SP_GetCandidateNames + projectId + '\''), httpOptions);
  }

  getSaveNSlideInfo(modelToSave: string) {
    const regex = /Negative/gi;
    const regexapostrophe = /'/gi;
    const saveObj = JSON.parse(modelToSave);
    // console.log(saveObj.NameRanking);
    // if (saveObj.NameRanking.length > 9) {
    //   const newNameRanking = saveObj.NameRanking.replace(regex, 'novalue');
    //   saveObj.NameRanking = newNameRanking;
    // }

    this.japanese = localStorage.getItem('isKatakana');

    if (saveObj.NamesToExplore !== '') {
      saveObj.NamesToExplore = this.convertToEntities(saveObj.NamesToExplore);
    }
    if (saveObj.NewNames !== '') {
      saveObj.NewNames = this.convertToEntities(saveObj.NewNames);
    }
    if (saveObj.KanaNamesNegative !== '') {
      saveObj.KanaNamesNegative = this.convertToEntities(saveObj.KanaNamesNegative);
    }
    saveObj.NamesToExplore = saveObj.NamesToExplore.replace(regexapostrophe, '\'\'');
    saveObj.NewNames = saveObj.NewNames.replace(regexapostrophe, '\'\'');
    const params = saveObj.presentationid + ',' + saveObj.slideNumber + ',\'' +
      saveObj.NameRanking + '\',\'' + saveObj.NewNames + '\',\'' + saveObj.NamesToExplore + '\',\'' +
      saveObj.NamesToAvoid + '\',\'' + saveObj.Direction + '\',\'' +
      saveObj.KanaNamesNegative + '\',' + saveObj.recraft;
    return this.http.post(this.webBaseUrl + this.apiCall, JSON.stringify(this._SP_GetSlideInfo + params), httpOptions);
  }

  getGroupSummary(projectId: string) {
    return this.http.post(this.webBaseUrl + this.apiCall, JSON.stringify(this._SP_Get_Group_Summary + projectId), httpOptions);
  }

  sendNameToNwVote(name: any) {
    return this.http.post(this.webBaseUrl + this.apiCall, { name: name });
  }


  convertToEntities(str: string) {
    // if (str.length !== 0) {
    if (str.length !== 0 && (this.japanese === 'true') ? true : false) {
      const tstr = str.trim();
      let bstr = '';
      for (let i = 0; i < tstr.length; i++) {
        bstr += '&#' + tstr.charCodeAt(i) + ';';
      }
      return bstr;
    } else {
      return str;
    }
  }


  sendGoSignalVoting(project: any, go: any): any {
    const data = {
      token:
        '38230499-A056-4498-80CF-D63D948AA57F',
      project:
        project,
      isOn:
        (go) ? 1 : 0
    }
    return this.http.post(this.webBaseUrlVote + 'SwitchProjectStatus', JSON.stringify(data), httpOptions);

  }

  getNwVoteData(project: any, name: any): any {
    const data = {
      token:
        '38230499-A056-4498-80CF-D63D948AA57F',
      project:
        project,
      name:
        name
    }
    console.log(this.http.post(this.webBaseUrlVote + 'UserListVote', JSON.stringify(data), httpOptions))
    return this.http.post(this.webBaseUrlVote + 'UserListVote', JSON.stringify(data), httpOptions);
  }

  ResetProjectData(project: any): any {
    const data = {
      token:
        '38230499-A056-4498-80CF-D63D948AA57F',
      project:
        project,
    }
    return this.http.post(this.webBaseUrlVote + 'ResetProjectData', JSON.stringify(data), httpOptions);
  }

  DeleteUserFromProject(project: any, name: any): any {
    const data = {
      token:
        '38230499-A056-4498-80CF-D63D948AA57F',
      project:
        project,
      username:
        name,
      userToken:
        ""
    }
    return this.http.post(this.webBaseUrlVote + 'DeleteUserFromProject', JSON.stringify(data), httpOptions);
  }

}