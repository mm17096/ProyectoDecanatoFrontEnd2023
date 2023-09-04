// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private dataUpdated = new Subject<void>();

  dataUpdated$ = this.dataUpdated.asObservable();

  notifyDataUpdated() {
    this.dataUpdated.next();
  }
}
