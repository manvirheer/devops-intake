import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-comments-display-panel',
  templateUrl: './comments-display-panel.component.html',
  styleUrls: ['./comments-display-panel.component.css']
})
export class CommentsDisplayPanelComponent implements OnInit {

  constructor(private http: HttpClient, private renderer: Renderer2) { }
  response: any;

  @Input() workItemNumber;
  @ViewChild('listRef') listRef!: ElementRef;
   list = document.querySelector('#list');
  ngOnChanges(changes) {
    if(this.listRef) {
    //this.list.innerHTML = ''
    }
    if(this.workItemNumber){
      this.consoleTest();
      this.getComments()

    }
  }

  consoleTest() {
    console.log(this.workItemNumber)
  }


  getComments() {
    this.http.get<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/workItems/${this.workItemNumber}/comments?api-version=6.0-preview.3`, {
      headers: {
        "Authorization": "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=",
        "Content-Type": 'application/json'
      }
    }).subscribe((res) => {
      this.response = res
      console.log(this.response)
      if (this.response)
        this.response!.comments.forEach((comment: any) => {

          var outerDiv = this.renderer.createElement('div');
          outerDiv.className = 'bg-white  mt-2 rounded-lg p-3 border-2 min-w-full';
          var innerDivLook = this.renderer.createElement('div');
          innerDivLook.className = 'flex items-center space-x-6 mb-4 w-full'
          var innerDivLookImg = this.renderer.createElement('img')
          innerDivLookImg.className = 'h-5 w-5 object-cover object-center rounded-full'
          innerDivLookImg.src = 'https://cdn-icons-png.flaticon.com/512/747/747376.png'
          var innerDivLookDiv = this.renderer.createElement('div');
          var innerDivLookDivP = this.renderer.createElement('p')
          innerDivLookDivP.className = 'text-lg text-gray-700 font-normal mb-1'
          innerDivLookDivP.textContent = comment.createdBy.displayName
          innerDivLookDiv.appendChild(innerDivLookDivP);
          innerDivLook.appendChild(innerDivLookImg)
          innerDivLook.appendChild(innerDivLookDiv)
          outerDiv.appendChild(innerDivLook)
          var innerDivContent = this.renderer.createElement('div');
          var innerDivContentP = this.renderer.createElement('p');
          innerDivContentP.textContent = (comment.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '))
          innerDivContent.appendChild(innerDivContentP);
          outerDiv.appendChild(innerDivContent);


          this.renderer.appendChild(this.listRef.nativeElement, outerDiv)
        })
    })

  }
  ngOnInit(): void {
  }

}
