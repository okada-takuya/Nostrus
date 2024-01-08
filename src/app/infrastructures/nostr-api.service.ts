import { Injectable } from '@angular/core';
import {
  EventPacket,
  RxNostr,
  batch,
  createRxBackwardReq,
  createRxForwardReq,
  createRxNostr,
  filterByType,
  uniq,
} from 'rx-nostr';
import { Event } from 'nostr-typedef';
import { Observable, ReplaySubject, bufferTime } from 'rxjs';

import { EventStoreService } from '../shared/event-store.service';

@Injectable({
  providedIn: 'root',
})
export class NostrApiService {
  // default relays
  private readonly DEFAULT_RELAY_URLS: string[] = ['wss://yabu.me'];

  readonly rxNostr: RxNostr = createRxNostr();
  readonly eventPacketsObservable: Observable<EventPacket>;
  readonly metadetaPacketsObservable: Observable<EventPacket>;

  constructor(private eventStoreService: EventStoreService) {
    const allMessageObservable = this.rxNostr.createAllMessageObservable();
    allMessageObservable.pipe(filterByType('NOTICE')).subscribe((packet) => {
      console.warn('[rx-nostr notice]', packet);
    });
    allMessageObservable.pipe(filterByType('CLOSED')).subscribe((packet) => {
      console.error('[rx-nostr closed]', packet);
    });

    const metadataReq = createRxBackwardReq();
    const eventsReq = createRxForwardReq();

    this.eventPacketsObservable = this.rxNostr
      .use(eventsReq.pipe(bufferTime(1000, null, 10), batch()))
      .pipe(uniq());

    this.metadetaPacketsObservable = this.rxNostr.use(
      metadataReq.pipe(bufferTime(1000, null, 10), batch())
    );
    // .subscribe();
  }
}
