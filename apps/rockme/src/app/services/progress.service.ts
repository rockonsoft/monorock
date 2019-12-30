import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  busyCount = 0;
  private _busy: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly busy: Observable<boolean> = this._busy.asObservable();

  constructor() {}

  setBusy() {
    this.busyCount++;
    this._busy.next(true);
  }

  setCompleted() {
    this.busyCount--;
    if (this.busyCount <= 0) {
      this.busyCount = 0;
      this._busy.next(false);
    }
  }
}
