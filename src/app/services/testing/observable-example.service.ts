import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private myBehaviourSubject = new BehaviorSubject<string>('some data of Behaviour subject');
  private mySubject = new Subject<string>(); // subject будет хранить всех подписчиков
  private myObservable = new Observable<string>((subscriber => {
    subscriber.next('sync someValue');
    setTimeout(() => {
      subscriber.next('someValue');
    }, 3000)
  }));

  constructor() { }

  initObservable(): void {

  }

getObservable(): Observable<string> {
  return this.myObservable;
}
getSubject(): Subject<string> {
    return this.mySubject;
}
getBehaviourSubject(): BehaviorSubject<string> {
    return this.myBehaviourSubject;
}
}
