import { Injectable } from '@angular/core';
import {
  EventPacket,
  RxNostr,
  createRxForwardReq,
  createRxNostr,
} from 'rx-nostr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // default relays
  private readonly DEFAULT_RELAY_URLS: string[] = ['wss://yabu.me'];

  private readonly rxNostr: RxNostr = createRxNostr();

  readonly observable: Observable<EventPacket>;
  readonly rxReq = createRxForwardReq();

  constructor() {
    this.rxNostr.setDefaultRelays(this.DEFAULT_RELAY_URLS);

    this.observable = this.rxNostr.use(this.rxReq);
  }
}
