import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})

export class BugFormComponent implements OnInit {

  //form variables
  name: string = "";
  website: string = "";
  email: string = "";
  url: string = "";
  title: string = "";
  severity: string = "";
  description: string = "";
  tags = [];

  //form assistance text
  urlAssistance: string = "Mention the url of the page where you are facing the issues.";
  nameAssistance: string = "Mention your name here.";
  websiteAssistance: string = "Mention the name of the company you belong to."
  emailAssistance: string = "Mention the email by which we can contact you.";
  titleAssistance: string = "Mention a relevant title describing the bug.";
  severityAssistance: string = "Mention the severity with 1 as critical to 4 as low";
  descriptionAssistance: string = "Mention the description here. Be as detailed as possible."
  //1 - Critical | 2 - High | 3 - Medium | 4 - Low

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

  onUpdateURL(): boolean {
    if (this.url.length > 0) {
      if (this.urlPattern.test(this.url)) {
        this.urlAssistance = "Mention the url of the page where you are facing the issues.";
        return true;
      }
      else {
        this.urlAssistance = "Please enter a valid URL.";
        return false;
      }
    }
    else {
      this.urlAssistance = "Mention the url of the page where you are facing the issues.";
      return true;
    }
  }

  onUpdateWebsite(): boolean {
    if (this.website.length > 0) {
      if (this.urlPattern.test(this.website)) {
        this.websiteAssistance = "Mention the name of the company you belong to.";
        return true;
      }
      else {
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
      if (this.emailPattern.test(this.email)) {
        this.emailAssistance = "Mention the email by which we can contact you.";
        return true;
      }
      else {
        this.emailAssistance = "Please enter a valid email address.";
        return false;
      }
    }
    else {
      this.emailAssistance = "Mention the email by which we can contact you.";
      return true;
    }
  }
  fileName = '';
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      var r  = new FileReader();
      r.readAsBinaryString(file);
      r.addEventListener('load', event => {
    
      });
      var dataS: string = ''
      
      const formData = new FormData();
      r.onloadend = function(e){
        var self = this;
        dataS =  (r.result)!.toString() ;
        console.log(dataS);
        console.log('This should be first')
        formData.append('data',dataS);
        formData.append("Authorization", "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=");
        formData.append('content-type', 'application/octet-stream');
      
      console.log('This should be second')
      console.log(dataS)
      console.log(formData.getAll('content-type'))
      const upload$ = self.http.post<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/attachments?api-version=5.0&fileName=${this.fileName}`, formData);
      
      upload$.subscribe(data => {
        console.log('data')
      });
    }
    }
  }

    onChangeSeverity(event: Event) {
      this.severity = (<HTMLInputElement>event.target).value;
    }

    haveName(): boolean {
      if (!this.name) {
        //doesn't detect change
        this.nameAssistance = "Name is required";

        return false;
      }
      return true;
    }

    haveWebsite() {
      if (!this.website) {
        this.websiteAssistance = "Website is required";
        return false;
      }
      return true;
    }

    haveEmail() {
      if (!this.email) {
        this.emailAssistance = "Email is required";
        return false;
      }
      return true;
    }

    haveTitle() {
      if (!this.title) {
        this.titleAssistance = "Title is required";
        console.log(this.titleAssistance)
        return false;
      }
      return true;
    }

    haveDescription() {
      if (!this.description) {
        this.descriptionAssistance = "Description is required";
        return false;
      }
      return true;
    }


    checkRequiredFields(): boolean {
      if (!this.haveName() || !this.haveDescription() || !this.haveWebsite() || !this.haveTitle())
        return false;
      return true;
    }

    handleSubmit() {
      
      const finalDesc = `<head><link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
      <style>
      .open{
        font-family: 'Open Sans', sans-serif;
      }
      </style>
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
      </head>
      
<div class="open text-lg bg-gray-100 border-2 rounded-sm" style="font-size: 1.2em">
<code>Following bug was reported by ${this.name}. Company - ${this.website} and Email - ${this.email}</code>
</div>
<br /> ${this.description}`;

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
          "value": `Bug - ${this.title}`
        },
        {
          'op': 'add',
          'path': '/fields/System.Description',
          'from': null,
          'data-type': 'HTML',
          'value': finalDesc
        },
        {
          'op': 'add',
          'path': '/fields/System.History',
          'from': null,
          'value': 'Test Comment'
        },
        {
          'op': 'add',
          'path': '/fields/Microsoft.VSTS.Common.Severity',
          'from': null,
          'value': `${this.severity}`
        },
        {
          'op': 'add',
          'path': '/fields/System.Tags',
          'from': null,
          'value': `Intake, Traige`
        }
      ];

      this.http.post<any>(`https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$Bug?api-version=6.0`, body, { headers }).subscribe(data => {

      })


      //Making sure the title, description, email, name, and company are filled and not empty


    }
    ngOnInit(): void {
    }

  }
