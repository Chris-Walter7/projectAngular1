import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService) {
  }


  ngOnInit() {

    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
      console.log('first myObservable data', data)
    });

    myObservable.subscribe((data) => {
      console.log('second myObservabledata', data) //observable не производит утечку памяти, так как не делает массовую рассылку
    });

    const mySubject = this.testing.getSubject();

    mySubject.next('subject value')

    /*mySubject.subscribe((data) => {
      console.log('first data subject', data)
    });
    mySubject.subscribe((data) => {
      console.log('second data subject', data)
    });*/

    mySubject.next('subject value1');

    const myBehaviour = this.testing.getBehaviourSubject();
    myBehaviour.subscribe((data) => {
      console.log('first data behaviourSubject', data)
    });

    myBehaviour.next('new data from behaviourSubject');
    myBehaviour.next('new data1 from behaviourSubject');
  }
}
