import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth.service";
import {ConfigService} from "../../../services/config.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login:string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveUserInStore: boolean;
  showCardNumber: boolean;
  selectedValue: string;
  constructor(private messageService: MessageService,
              private authService: AuthService,
              private config: ConfigService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }
registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary: 'Пароли не совпадают', key: 'tl-r'});
      return false;
    }
    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }
    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj);

      this.messageService.add({severity:'success', summary: 'Регистрация прошла успешна'});
    } else {
      this.messageService.add({severity:'warn', summary: 'Пользователь уже зарегистрирован'});
    }
  }

  saveUser(): void {
  if (this.selectedValue) {}
  }
}
