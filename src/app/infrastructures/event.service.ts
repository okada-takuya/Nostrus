import { Injectable } from '@angular/core';
import {
  EventPacket,
  RxNostr,
  createRxBackwardReq,
  createRxForwardReq,
  createRxNostr,
} from 'rx-nostr';
import { Observable } from 'rxjs';
import { Kind } from '../domain/kind';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // default relays
  private readonly DEFAULT_RELAY_URLS: string[] = ['wss://yabu.me'];

  readonly rxNostr: RxNostr = createRxNostr();

  readonly forwardReqObservable: Observable<EventPacket>;
  readonly backwardReqObservable: Observable<EventPacket>;
  readonly rxForwardReq = createRxForwardReq();
  readonly rxBackwardReq = createRxBackwardReq();

  constructor() {
    this.rxNostr.setDefaultRelays(this.DEFAULT_RELAY_URLS);

    this.forwardReqObservable = this.rxNostr.use(this.rxForwardReq);
    this.backwardReqObservable = this.rxNostr.use(this.rxBackwardReq);
  }

  reqMetaData(pubkey: string) {
    this.rxBackwardReq.emit({ kinds: [Kind.Metadata], authors: [pubkey] });
  }

  reqTextNote() {
    this.rxForwardReq.emit({ kinds: [Kind.Text] });
  }
}
