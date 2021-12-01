import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit {

  //form variables
  name: string = "";
  website: string = "";
  email: string = "";
  url: string = "";
  title: string = "";
  severity: string = ""
  tags = [];

  //form assistance text
  urlAssistance: string = "Mention the url of the page where you are facing the issues.";
  nameAssistance: string = "Mention your name here.";
  websiteAssistance: string = "Mention the name of the company you belong to."
  emailAssistance: string = "Mention the email by which we can contact you.";
  titleAssistance: string = "Mention a relevant title describing the bug.";
  
  src: string = ""

  //regex patterns used to match
  urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  numberPresencePattern = /\d/;

  constructor(private http: HttpClient) { }

  //form validation methods
  onUpdateName(): boolean {
    if (this.numberPresencePattern.test(this.name)) {
      this.nameAssistance = "Name cannot have a number in it.";
      return false;
    }
    else {
      this.nameAssistance = "Mention your name here.";
      return true;
    }
  }

  onUpdateWebsite(): boolean {
    if (this.website.length > 0) {
      if (this.urlPattern.test(this.website)){
        this.websiteAssistance = "Mention the name of the company you belong to."
        return true;
      }
      else{
        this.websiteAssistance = "Enter a valid website only.";
        return false;
      }
    }
    else {
      this.websiteAssistance = "Mention the name of the company you belong to."
      return true;
    }
  }

  onUpdateEmail(): boolean {
    if (this.email.length > 0) {
      if (this.emailPattern.test(this.email)){
        this.emailAssistance = "Mention the email by which we can contact you.";
        return true;
      }
      else{
        this.emailAssistance = "Please enter a valid email address.";
        return false;
      }
    }
    else {
      this.emailAssistance = "Mention the email by which we can contact you.";
      return true;
    }
  }

  onFileUpload(event: any): void {
    debugger
    console.log(event.target.files[0])
    var newImg = document.createElement('img')
    this.src = event.target.files[0].name
  }


  handleSubmit() {

    const organization = 'saasberry';
    const project = 'SaaSberry%20Innovation%20Lab'
    const headers = {
      'Authorization': `Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=`,
      'Content-Type': 'application/json-patch+json',
    };

    const body = [
      {
        "op": "add",
        "path": "/fields/System.Title",
        "value": "Transparency - Bug - Automation"
      },
      {
        'op': 'add',
        'path': '/fields/System.Description',
        'from': null,
        'value': 'Test description'
      },
      {
        'op': 'add',
        'path': '/fields/System.History',
        'from': null,
        'value': 'Test Comment'
      },
    ];

    this.http.post<any>(`https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$Task?api-version=6.0`, body, { headers }).subscribe(data => {

    })

  }
  ngOnInit(): void {
  }

}
