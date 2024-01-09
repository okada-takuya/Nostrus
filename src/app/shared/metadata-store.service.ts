import { Injectable } from '@angular/core';
import { Event, Content } from 'nostr-typedef';
import { EventPacket } from 'rx-nostr';
import { Observable, ReplaySubject } from 'rxjs';

import { NostrApiService } from '../infrastructures/nostr-api.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataStoreService {
  private eventMap: Map<string, Content.Metadata> = new Map<
    string,
    Content.Metadata
  >();
  readonly incomingMetadataObservable: ReplaySubject<Content.Metadata> = new ReplaySubject();

  constructor(private nostrApiService: NostrApiService) {
    this.nostrApiService.metadetaPacketsObservable.subscribe(
      (packet: EventPacket) => {
        const event: Event = packet.event;
        const metadata: Content.Metadata = JSON.parse(event.content);;
        this.eventMap.set(event.pubkey, metadata);
        this.incomingMetadataObservable.next(metadata);
      }
    );
  }

  observeMetadataOf(pubkey: string): Observable<Content.Metadata> {
    // Mapから取得可能だった場合に、通常のSubjectでは再配信不可能なため。
    const metadataSubject: ReplaySubject<Content.Metadata> = new ReplaySubject<Content.Metadata>();
    const metadata: Content.Metadata | undefined = this.eventMap.get(pubkey);
    if (metadata) {
      metadataSubject.next(metadata);
    } else {
      // TODO metadata 1件読みのNostrAPIへのemit
    }
    return metadataSubject;
  }
}
