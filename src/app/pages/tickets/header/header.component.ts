import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {timeout} from "rxjs";
import {IMenuType} from "../../../models/menuType";
import {IUser} from "../../../models/users";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {UserService} from "../../../services/user/user.service";




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  user: IUser | null;
  private settingsActive = false;
  private timerInterval: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.items = this.initMenuItems();
    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
      }, 1000)

    this.user = this.userService.getUser();
  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log('ev', ev)
    if (ev['menuType']) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    }
  }
    initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: () => {
      }
      },

    ];
  }

}
