import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here',
  };

  pondFiles = [];

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
    this.finishUpload();
  }

  finishUpload(){
    (this.myPond.getFiles().forEach(file => {
      console.log(file.file.name);
    }));
  }
  ngOnInit(): void {
  }
  // function uploadFile3(){
  //   var files = myInput.files[0];
  //   var reader = new FileReader();
  //   reader.onload = processFile(files);
  //   reader.readAsArrayBuffer(files); 
  //   console.log(reader)
  // }
  
  // function processFile(theFile){
  //   return function(e) { 
  //     var theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
  //     fileByteArray.push(theBytes);
  //     document.getElementById('file').innerText = '';
  //     for (var i=0; i<fileByteArray.length; i++) {
  //         document.getElementById('file').innerText += fileByteArray[i];
  //     }
  //   }
}
