import { Injectable } from '@angular/core';

import { Event } from 'nostr-typedef';
import { NostrApiService } from '../infrastructures/nostr-api.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { EventPacket } from 'rx-nostr';

@Injectable({
  providedIn: 'root',
})
export class EventStoreService {
  private eventMap: Map<string, Event> = new Map<string, Event>();
  /** NostrApiServiceの流入イベントを観測するObservable */
  readonly incomingEventsObservable: Subject<Event> = new Subject();

  constructor(private nostrApiService: NostrApiService) {
    this.nostrApiService.eventPacketsObservable.subscribe(
      (packet: EventPacket) => {
        this.eventMap.set(packet.event.id, packet.event);
        this.incomingEventsObservable.next(packet.event);
      }
    );
  }

  getEventById(id: string): Observable<Event> {
    // Mapから取得可能だった場合に、通常のSubjectでは再配信不可能なため。
    const eventSubject: ReplaySubject<Event> = new ReplaySubject<Event>();
    const event = this.eventMap.get(id);
    if (event) {
      eventSubject.next(event);
    } else {
      // TODO event 1件読みのNostrAPIへのemit
    }
    return eventSubject;
  }
}
