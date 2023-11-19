import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {UserService} from "../../../services/user/user.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  obj = {type: 'custom', label : 'Обычное'}
  selectedMenuType: IMenuType;

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  constructor(private ticketService: TicketsService,
              private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }
changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
  this.updateMenuType.emit(ev.value);
}
  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
      next: (data) => {};
      error: (err) => {
        console.log('err', err)
      },
      complete: () => {}
    });
  }
  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });
  }
}




