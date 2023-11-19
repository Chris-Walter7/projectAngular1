import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {elementAt, Subscription} from "rxjs";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  private  tourUnsubscriber: Subscription;
     tickets: ITour[];
     ticketsCopy: ITour[];
@ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective

  // @ts-ignore
  tourWrap: any;
  constructor(private ticketService: TicketsService,
              private router: Router,
              private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
             ) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe( //мы подписываемся на изменения, как только они происходят, вызывается метод
      (data) => { //в параметры метода передается результат синхронной операции
      //последовательный вызов, сначала обращаемся к ticketService, у которого есть метод getTickets (вызывает метод ticketServiceRest), который возвращает Observable и формирует запрос на сервер
           // @ts-ignore
        for(let i = 0; i < data.length; i++) {
          // @ts-ignore
          data[i].id = (i + 1).toString()
        }
           this.tickets = data;
           this.ticketsCopy = data;
           this.ticketStorage.setStorage(data)
      })
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {
      console.log('data', data)
      switch (data?.value) {
        case 'single':
          this.tickets = this.ticketsCopy.filter((el) => el.type === 'single');
          break;
        case 'multi':
          this.tickets = this.ticketsCopy.filter((el) => el.type === 'multi');
          break;
        case 'all':
          this.tickets = [...this.ticketsCopy];

      }
      /*if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        this.defaultDate = dateWithoutTime[0];
        this.tickets = this.ticketsCopy.filter((el) => el.date === this.defaultDate);
      }
      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);
      });*/
    });
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    )
  }
  goToTicketInfoPage(id: string) {


    this.router.navigate(['/tickets/ticket/${id}']).then(r =>{} )
  }

  directiveRenderComplete(ev:boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background: grey')
    this.blockDirective.initStyle(0)
  };
  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
  }
}
