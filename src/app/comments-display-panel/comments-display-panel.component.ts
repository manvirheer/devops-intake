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
  @ViewChild('commentsRef') commentsRef!: ElementRef;
  @ViewChild('enterRef') enterRef!: ElementRef;
  @ViewChild('commentBox') commentBox!: ElementRef;


  list = document.querySelector('#list');
  
  ngOnChanges(changes) {
    if (this.listRef) {
      //this.list.innerHTML = ''
    }
    if (this.workItemNumber) {
      this.consoleTest();
      this.getComments();
      this.renderer.setStyle(this.commentBox.nativeElement, 'display', 'block');
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
      this.response = res;
      //Remove the previous list of comments and extra modals
      Array.from(this.listRef.nativeElement.children).forEach(child => {
        console.log('children.length=' + this.listRef.nativeElement.children.length);
        this.renderer.removeChild(this.listRef.nativeElement, child);
      });

      //If there are no commetns for that ticket then show unable to found any previous comments. 
      if (this.response.comments.length == 0) {
        var noCommentFoundModal = this.renderer.createElement('div');
        noCommentFoundModal.className = 'text-lg font-light font-customPro p-6 text-white text-center rounded-lg border-2 bg-gray-400';
        noCommentFoundModal.textContent = "Unable to found any previous comments";
        this.renderer.appendChild(this.listRef.nativeElement, noCommentFoundModal);
      }
      //for the comments found, show the list
      else {
        this.response!.comments.forEach((comment: any) => {
          var outerDiv = this.renderer.createElement('div');
          var innerDivLook = this.renderer.createElement('div');
          var innerDivLookImg = this.renderer.createElement('img');
          var innerDivLookDiv = this.renderer.createElement('div');
          var innerDivLookDivP = this.renderer.createElement('p');
          var innerDivContent = this.renderer.createElement('div');
          var innerDivContentP = this.renderer.createElement('p');
          outerDiv.className = 'bg-white  mt-2 rounded-lg p-3 border-2 min-w-full';
          innerDivLook.className = 'flex items-center space-x-6 mb-4 w-full';
          innerDivLookImg.className = 'h-5 w-5 object-cover object-center rounded-full';
          innerDivLookDivP.className = 'text-lg text-gray-700 font-normal mb-1';
          innerDivLookImg.src = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';
          innerDivLookDivP.textContent = comment.createdBy.displayName;
          innerDivContentP.textContent = (comment.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '));
          innerDivLookDiv.appendChild(innerDivLookDivP);
          innerDivLook.appendChild(innerDivLookImg);
          innerDivLook.appendChild(innerDivLookDiv);
          outerDiv.appendChild(innerDivLook);
          innerDivContent.appendChild(innerDivContentP);
          outerDiv.appendChild(innerDivContent);
          this.renderer.appendChild(this.listRef.nativeElement, outerDiv);
        })
      };
    })
  }

  addComment() {

    //When someone is adding comment to a work item then it means that there is going to be atleast one comment.
    Array.from(this.listRef.nativeElement.children).forEach(child => {
      if ((child as HTMLElement).textContent == 'Unable to found any previous comments')
        this.renderer.removeChild(this.listRef.nativeElement, child);
    });

    //API call for adding the comment
    this.http.post<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/workItems/${(this.workItemNumber)}/comments?api-version=6.0-preview.3`,
      {
        "text": this.commentsRef.nativeElement.value
      },
      {
        headers: {
          "Authorization": "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=",
          "Content-Type": 'application/json'
        }
      }).subscribe(res => {
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
        innerDivLookDivP.textContent = "User"
        innerDivLookDiv.appendChild(innerDivLookDivP);
        innerDivLook.appendChild(innerDivLookImg)
        innerDivLook.appendChild(innerDivLookDiv)
        outerDiv.appendChild(innerDivLook)
        var innerDivContent = this.renderer.createElement('div');
        var innerDivContentP = this.renderer.createElement('p');
        innerDivContentP.textContent = this.commentsRef.nativeElement.value
        innerDivContent.appendChild(innerDivContentP);
        outerDiv.appendChild(innerDivContent);
        this.renderer.appendChild(this.listRef.nativeElement, outerDiv)
        console.log(res);
        //Empty the comment input field for accepting more entries from the user
        this.commentsRef.nativeElement.value = ""
      })
  }

  ngOnInit(): void {
  }

}
