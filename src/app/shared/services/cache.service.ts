import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public responseCache = new Map();

  getResponsefromCache(data: string) {
    const cacheData = this.responseCache.get(data);
    if (cacheData) {
      return of(cacheData);
    }
    return null;
  }

  setDataToCache(key: string, data: any) {
    this.responseCache.set(key, data);
  }
}
