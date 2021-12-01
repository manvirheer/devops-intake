import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  response: any;
  documents = document;
  workItemNumber: string;
  @ViewChild('list') listRef!: ElementRef;
  @ViewChild('commentsRef') commentsRef!: ElementRef;
  @ViewChild('workID') workID!: ElementRef;
  constructor(private http: HttpClient, private renderer: Renderer2) { }
  onSelectionChange( workItemNumber : {type  :string}){
    this.workItemNumber = workItemNumber.type;
  }
  
  getComments() {
    this.http.get<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/workItems/${this.workID.nativeElement.value}/comments?api-version=6.0-preview.3`, {
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

  addComment() {
    this.http.post<any>(`https://dev.azure.com/saasberry/SaaSberry%20Innovation%20Lab/_apis/wit/workItems/${(this.workID.nativeElement.value)}/comments?api-version=6.0-preview.3`, 
    {
      "text" : this.commentsRef.nativeElement.value
    },
    {
      headers: {
        "Authorization": "Basic OjJuc2VwM2V1b211cWVxYWJqcW1rdnVuMmtqbGc1ZHByMzduMnZ1NTRpcGV4M2UycDRuaXE=",
        "Content-Type": 'application/json'
      }
    }).subscribe(res => {
      console.log(res);
    })

    //this.listRef.nativeElement.innerHTML = ''
  //  this.getComments()
  }


  ngOnInit(): void {
  }

}
