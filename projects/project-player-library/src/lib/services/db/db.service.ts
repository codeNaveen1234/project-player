import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbName = 'projectPlayer'
  private dbVersion = 2
  private storeName = 'projects'
  private db!: IDBDatabase
  private storeDownload = 'downloadedProjects'

  constructor() {
    this.initializeDb()
  }

  private initializeDb(){
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(this.storeDownload)) {
        db.createObjectStore(this.storeDownload,{ keyPath: 'keyid'});
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error('Error opening database:', (event.target as IDBOpenDBRequest).error);
    };
  }

  addData(data:any){
    const transaction = this.db.transaction([this.storeName],'readwrite')
    const store = transaction.objectStore(this.storeName)
    store.add(data)
  }

  getData(key:any):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName],'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request.result)
      }
    })
  }

  updateData(data: any) {
    let downloadData:any = null;
    if(data.data.isDownload){
      downloadData = {
        keyid: data.key,
        data: {
          title : data.data.title,
          description : data.data.description,
          lastDownloadedAt : data.data.lastDownloadedAt,
          isDownload : data.data.isDownload
        }
      }
    }
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.put(data);
    request.onsuccess = (event) => {
      console.log('Data updated successfully');
    };
    request.onerror = (event) => {
      console.error('Error updating Data: ');
    };
    if(!downloadData) return
    const transactionForDownloads = this.db.transaction([this.storeDownload], 'readwrite');
    const storeForDownloads = transactionForDownloads.objectStore(this.storeDownload);
    const requestForDownloads = storeForDownloads.put(downloadData);

    requestForDownloads.onsuccess = (event) => {
      console.log('Data updated successfully');
    };
    requestForDownloads.onerror = (event) => {
      console.error('Error updating Data: ');
    };
  }

  deleteData(key: any) {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.delete(key);

    request.onsuccess = (event) => {
      console.log('Item deleted successfully');
    };

    request.onerror = (event) => {
      console.error('Error deleting item: ',);
    };
  }

}