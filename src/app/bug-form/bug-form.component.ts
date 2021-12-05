import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  tags = new Array<string>();
  tag: string = "";

  @ViewChild('inputFiles', { static: true }) inputFilesEle!: ElementRef;
  @ViewChild('tagList', { static: true }) tagList!: ElementRef;

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

  //regex patterns used to match
  urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  numberPresencePattern = /\d/;

  constructor(private http: HttpClient, private renderer: Renderer2) { }

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
  addNewTag($event: Event) {
    this.tags.push(this.tag);
    this.createNewTag();
    this.tag = "";
    console.log(this.tags)
 

  }

  createNewTag() {
    Array.from(this.tagList.nativeElement.children).forEach(child => {
      this.renderer.removeChild(this.tagList.nativeElement, child);
    });
    this.tags.forEach(tag => {
      let div = this.renderer.createElement("div");
      div.className = "bg-blue-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden";
      let button = this.renderer.createElement("button");
      button.className = "w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none";
      let span = this.renderer.createElement("span");
      span.className = "ml-2 mr-1 leading-relaxed truncate max-w-xs px-1";
      let divInner = this.renderer.createElement("svg");
      divInner.className = "w-4 h-4 fill-current mx-auto";
      let img = this.renderer.createElement("img");
      this.renderer.listen(img, 'click', (evt) => {
        console.log(evt.target.parentNode.parentNode.parentNode.firstChild.textContent);
        this.tags.forEach((tagInner, i, obj) => {
          debugger
          if (tagInner == evt.target.parentNode.parentNode.parentNode.firstChild.textContent)
          obj.splice(i, 1);
        })
       evt.target.parentNode.parentNode.parentNode.parentNode.removeChild(evt.target.parentNode.parentNode.parentNode);
      })
      this.renderer.setAttribute(img, "src", "https://cdn-icons.flaticon.com/png/512/2961/premium/2961937.png?token=exp=1638677032~hmac=9f6a87ae870a6f5b8b324853575c3a17");
      span.textContent = tag;
      divInner.appendChild(img);
      button.appendChild(divInner);
      div.appendChild(span);
      div.appendChild(button);
      this.renderer.appendChild(this.tagList.nativeElement, div);
  
    })

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
        console.log(file)
        var fileNameExt = "hehe";

        fileNameExt = file?.name?.match(/\.[0-9a-z]+$/i)[0]
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
            }).subscribe((res) => {
              self.attachmentURLS.push(res.url);
              self.disabled = false; debugger
            });
        }
        reader.readAsDataURL(file);
      })
    }
    console.log(self.attachmentURLS)
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
    console.log("Submit action taken.")
    debugger;
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
    const attBody: Array<any> = [];
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
      );
    });

    //Request Payload
    const body = [];
    body.push(
      {
        "op": "add",
        "path": "/fields/System.Title",
        "value": `Bug - ${this.title}`
      });
      body.push(
      {
        'op': 'add',
        'path': '/fields/System.Description',
        'from': null,
        'data-type': 'HTML',
        'value': finalDesc
      });
      body.push(
      {
        'op': 'add',
        'path': '/fields/System.History',
        'from': null,
        'value': 'Test Comment'
      });
      body.push({
        'op': 'add',
        'path': '/fields/Microsoft.VSTS.Common.Severity',
        'from': null,
        'value': `${this.severity}`
      });
      body.push(
      {
          "op": "add",
          "path": "/fields/System.Tags",
          "value": this.tags.join(";"),      
      });
      body.push(
      ...attBody);
    ;

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


