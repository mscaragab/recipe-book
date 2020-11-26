import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {

  // constructor(private store)

  init(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
