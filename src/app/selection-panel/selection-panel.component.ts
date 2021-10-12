import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrls: ['./selection-panel.component.css']
})
export class SelectionPanelComponent implements OnInit {
  @Output() typeChange = new EventEmitter<{ type: string }>();

  selectionTitle: string = "Report a Bug";
  selection: string = 'Bug';
  titleAssistance:string = "Have a bug? Submit it here.";
  selectionAssistance:string = "Submitting a future enhancement or a feature instead, choose the relevant option";

  onChangeType(event: Event) {
    if((<HTMLInputElement>event.target).value === 'Bug'){
      this.selectionTitle = 'Report a Bug';
      this.selectionAssistance = 'Submitting a future enhancement or a feature instead, choose the relevant option';
      this.titleAssistance = "Have a bug? Submit it here."
    }
    else{
      this.selectionTitle = 'Submit a future enhancement';
      this.selectionAssistance = 'Found a bug? Report it here, choose the relevant option';
      this.titleAssistance = 'Want to add a future enhancement? Submit it here.';
    }
    //We don't want to emit if the new selected value is same as before
    if ((<HTMLInputElement>event.target).value !== this.selection) {
      this.selection = (<HTMLInputElement>event.target).value;
      this.typeChange.emit(
        { type: this.selection }
      )
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
