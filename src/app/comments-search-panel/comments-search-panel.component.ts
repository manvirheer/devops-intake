import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-comments-search-panel',
  templateUrl: './comments-search-panel.component.html',
  styleUrls: ['./comments-search-panel.component.css']
})
export class CommentsSearchPanelComponent implements OnInit {

  constructor() { }
  @ViewChild('workItemInput') workItemInput: ElementRef;
  @Output() selectionChange = new EventEmitter<{ type: string }>();

  workItemNumber: string = '';
  OnSearchClicked($event: Event) {
    if (Number.isInteger(parseInt(this.workItemInput.nativeElement.value))) {
      this.workItemNumber = this.workItemInput.nativeElement.value;
      console.log(this.workItemNumber);
      this.selectionChange.emit(
        { type: this.workItemNumber }
      );
    }
    else {
      alert("Please enter a number only.");
    }
  }

  ngOnInit(): void {
  }

}
