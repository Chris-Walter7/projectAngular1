import { Component, OnInit } from '@angular/core';
//import {ToolbarModule} from 'primeng/toolbar';
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText = 'Логин';
  pswText = "Пароль";
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy() {
    console.log('destroy')
  }

  vipStatusSelected(): void {
    if (this.selectedValue) {
    }
  }

  onAuth(): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    if (!this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser);
      this.userService.setToken('user-ptivate-token');
      this.router.navigate(['tickets/tickets-list'])
    } else {
      this.messageService.add({severity: 'error', summary: 'Проверьте введенные данные'});
    }
  }
}

