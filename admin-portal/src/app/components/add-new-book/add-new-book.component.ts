import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AddBookService } from 'src/app/services/add-book.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  newBook: Book = new Book();
  isBookAdded: boolean;
  checked: boolean = false;
  disabled: boolean = false;
  color: string;

  @ViewChild("fileUpload", {static: false}) 
  fileUpload: ElementRef;
  files  = [];  
  constructor(private addBookService: AddBookService,
    private uploadService: UploadImageService) { }

  ngOnInit(): void {
    this.isBookAdded = false;
    this.newBook.active = true;
    this.newBook.category = "Management";

    this.newBook.language = "english";
    this.newBook.format = "paperback";
  }

  onSubmit() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++)  
      {  
       const file = fileUpload.files[index];  
       this.files.push({ data: file, inProgress: false, progress: 0});  
      }  
    }
    this.addBookService.sendBook(this.newBook).subscribe(
      (data:any) => {
        this.uploadFiles(data.id);  
        this.isBookAdded = true;
        this.newBook = new Book();
        this.newBook.active = true;
        this.newBook.category = "Management";
        this.newBook.language = "english";
        this.newBook.format = "paperback";
      },
      (error) => {
        console.log(error)
      }
    );
  }

  uploadFile(file,id) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData,id).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }

  private uploadFiles(id:string) {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file,id);  
    });  
}

}
