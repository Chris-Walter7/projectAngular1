import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ITour} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {IUser} from "../../../models/users";
import {FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.userForm = new FormGroup({
      firstName: new FormGroup('aa', {validators: Validators.required}),
      lastName: new FormGroup('', [Validators.required]),
      cardNumber: new FormGroup('', ),
      birthday: new FormGroup(''),
        age: new FormGroup(22),
        citizen: new FormGroup('')
    });

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }
  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber)
  }

  onSubmit(): void {}

  selectDate($event: any) {
    
  }
}
