import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  // @ts-ignore
  constructor(private http: HttpClient) {}

  getTickets(): Observable<ITour[]> { // Observable замена promise
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }
}
