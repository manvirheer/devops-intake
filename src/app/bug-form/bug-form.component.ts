import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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
  disabled: boolean = true;
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
  attachmentURLS = new Array<string>();
  src: string = ""
  @ViewChild('inputFiles', { static: true }) inputFilesEle!: ElementRef;

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




  onFileSelected(event: Event) {
    var self = this;

    const files = Array.from((<HTMLInputElement>event.target).files!);

    console.log(files)
    if (files!.length > 0) {
      files!.forEach(file => {
        var reader = new FileReader();
        reader.onloadend = function () {
          const formData = new FormData();
          formData.append('body', file);
          const upload$ = self.http.post<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/attachments?api-version=6.0&fileName=${file.name}`, formData,
            {
              headers: {
                "Authorization": "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=",
                'Content-Type': 'application/octet-stream',
              }
            }).subscribe((res) => {self.attachmentURLS.push(res.url);
            self.disabled = false; debugger});

        }
        reader.readAsDataURL(file);
      })
    }
    console.log(self.attachmentURLS)

  onFileSelected() {

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




  handleSubmit() {

    var self = this;
    console.log(this.inputFilesEle.nativeElement.files)
    const files: Array<File> = Array.from(this.inputFilesEle.nativeElement.files);
    var requestArray = [];
    console.log(files)
    if (files.length > 1) {
      files.forEach(file => {
        var reader = new FileReader();
        reader.onloadend = function () {
          const formData = new FormData();
          formData.append('body', file);
          const upload$ = self.http.post<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/attachments?api-version=6.0&fileName=testFile`, formData,
            {
              headers: {
                "Authorization": "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=",
                'Content-Type': 'application/octet-stream',
              }
            });
          requestArray.push(upload$)
        }
        reader.readAsDataURL(file);
      })
    }
    this.onFileSelected();

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

    const attBody :Array<any> = [];
    this.attachmentURLS!.forEach(val => {
      attBody.push(
        {

          "op": "add",
          "path": "/relations/-",
          "value": {
            "rel": "AttachedFile",
            "url": val,
            "attributes": {
              "comment": "Attachment added from Azure automation"
            }
          }
        }
      )
    })



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

      },
      ...attBody
    ];

    const request2 = this.http.post<any>(`https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$Bug?api-version=6.0`, body, { headers }).subscribe(val => {
      console.log(val);
    });


    //Making sure the title, description, email, name, and company are filled and not empty
    this.name = "";
    this.website = "";
    this.email = "";
    this.url = "";
    this.title = "";
    this.severity = "";
    this.description = "";
  }
  ngOnInit(): void {
  }

}

      }
    ];

    const request2 = this.http.post<any>(`https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$Bug?api-version=6.0`, body, { headers });
    requestArray.push(request2);
    console.log(requestArray)
    var responseArray : Array<[]> ;
    responseArray = new Array(requestArray.length);
    
    console.log(requestArray.length)
    forkJoin(requestArray).subscribe(val => console.log(val)
    );

    //Making sure the title, description, email, name, and company are filled and not empty
    this.name = "";
    this.website = "";
    this.email = "";
    this.url = "";
    this.title = "";
    this.severity = "";
    this.description = "";
  }
  ngOnInit(): void {
  }


}

