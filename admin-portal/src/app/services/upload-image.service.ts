import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const upload_URL = environment.api+"book/add/image?id=";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http:HttpClient) { }

  public upload(formData,id) {

    return this.http.post<any>(upload_URL+id, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
}
