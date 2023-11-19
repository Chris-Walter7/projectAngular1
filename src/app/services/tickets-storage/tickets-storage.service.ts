import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketsStorage: ITour[];
  constructor() {}

  setStorage(data: ITour[]): void {
    this.ticketsStorage = data;
  }
  getStorage(): ITour[] {
    // @ts-ignore
    return this.ticketsStorage
  }
}
