import { Injectable } from '@angular/core';

import { Event } from 'nostr-typedef';
import { NostrApiService } from '../infrastructures/nostr-api.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { EventPacket } from 'rx-nostr';

// TODO: なんのEventのサービス化で特化したほうが良い
// TODO: Metadataはアプリ内一元管理でいいけど、TimelineむけEventはそうでもない。
@Injectable({
  providedIn: 'root',
})
export class EventStoreService {
  private eventMap: Map<string, Event> = new Map<string, Event>();
  /** NostrApiServiceの流入イベントを観測するObservable */
  readonly incomingEvents$: Subject<Event> = new Subject();

  constructor(private nostrApiService: NostrApiService) {
    this.nostrApiService.eventPackets$.subscribe(
      (packet: EventPacket) => {
        this.eventMap.set(packet.event.id, packet.event);
        this.incomingEvents$.next(packet.event);
      }
    );

    // TODO: nostterを参考にコンポーネントごとにeventの取得をした方がよさそう。
  }

  observeEventOf(id: string): Observable<Event> {
    // Mapから取得可能だった場合に、通常のSubjectでは再配信不可能なため。
    const event$: ReplaySubject<Event> = new ReplaySubject<Event>();
    const event: Event | undefined = this.eventMap.get(id);
    if (event) {
      event$.next(event);
    } else {
      // TODO event 1件読みのNostrAPIへのemit->subscribeしてsubjectに流す
    }
    return event$;
  }
}
