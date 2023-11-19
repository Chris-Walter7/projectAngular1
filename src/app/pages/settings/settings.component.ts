import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subject, Subscription, take} from "rxjs";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectScope: Subject<any>;
  settingsData:Subscription;
  settingsDataSubject: Subscription;
  private subjectUnsubscribe: Subscription;

  constructor(private testing: ObservableExampleService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.subjectScope = this.testing.getSubject();
    const myObservable = this.testing.getObservable();
    const unsubscribe = myObservable.subscribe( (data) => { // вызывается метод subscribe
      console.log('observer data', data) // получает данные сразу, которые определены в observable
    });

    unsubscribe.unsubscribe();

    this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
      console.log('data',data)
    });
    this.subjectScope.next('subData')

    this.settingsData = this.settingsService.loadUserSettings().subscribe((data)=> {
      console.log('settings data', data)
    })
    this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().subscribe(
      (data) => {
        console.log('settings from data subject', data)
      })
  }
  ngOnDestroy() {
   this.settingsData.unsubscribe();
   this.settingsDataSubject.unsubscribe();
  }
}
