import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor() { }

  generateFileName(file:any){
    let time = new Date().getTime()
    let fileType = file.type.split('/').pop()
    return `${time}.${fileType}`
  }

  convertTobase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (err) => {
        console.log('FILE UPLOAD ERROR: ', err);
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }

  base64ToFile(file:any){
    const contentType = file.split(';')[0].split(':')[1];
    const byteCharacters = atob(file.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return blob
  }
}