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
  readonly incomingMetadata$: ReplaySubject<Content.Metadata> =
    new ReplaySubject();

  constructor(private nostrApiService: NostrApiService) {
    this.nostrApiService.metadetaPackets$.subscribe((packet: EventPacket) => {
      const event: Event = packet.event;
      const metadata: Content.Metadata = JSON.parse(event.content);
      this.eventMap.set(event.pubkey, metadata);
      this.incomingMetadata$.next(metadata);
    });
  }

  observeMetadataOf(pubkey: string): Observable<Content.Metadata> {
    // Mapから取得可能だった場合に、通常のSubjectでは再配信不可能なため。
    const metadata$: ReplaySubject<Content.Metadata> =
      new ReplaySubject<Content.Metadata>();
    const metadata: Content.Metadata | undefined = this.eventMap.get(pubkey);
    if (metadata) {
      metadata$.next(metadata);
    } else {
      const subscription = this.nostrApiService.metadetaPackets$.subscribe(
        (packet: EventPacket) => {
          const event: Event = packet.event;
          const metadata: Content.Metadata = JSON.parse(event.content);
          metadata$.next(metadata);
          // 1件でsubscriptionを終わってよい。
          subscription.unsubscribe;
        }
      );
      this.nostrApiService.emitMetadataReq(pubkey);
    }
    return metadata$;
  }
}
