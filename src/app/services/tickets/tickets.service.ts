import { Injectable } from '@angular/core';
import {TicketRestService} from "../ticket-rest/ticket-rest.service";
import {elementAt, map, Observable, Subject} from "rxjs";
import {ITour, ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); // изолирует / запрещает возможность отправки данных и возвращает тот объект, на который мы можем подписаться, и он будет мониторить те изменения, которые будут отправлены этим subject


  constructor(private ticketServiceRest: TicketRestService) { }
  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === "single");
        return value.concat(singleTours)
      }
    ));
  }
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }
  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }



}


